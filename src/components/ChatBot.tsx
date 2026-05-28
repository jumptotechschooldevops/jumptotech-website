"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export type RealtimeChatMessage = {
  id: string;
  sender_type: "visitor" | "bot" | "admin";
  message: string;
  created_at: string;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [messages, setMessages] = useState<RealtimeChatMessage[]>([]);
  const { user, displayName } = useAuth();

  const sessionIdRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Generate or get unique session ID
    let sid = localStorage.getItem("jtt_chat_session");
    if (!sid) {
      sid = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem("jtt_chat_session", sid);
    }
    sessionIdRef.current = sid;

    // Load existing messages from Supabase
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sid)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data as RealtimeChatMessage[]);
      }
    };

    loadMessages();

    // Subscribe to new messages for this session
    const subscription = supabase
      .channel(`chat_${sid}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${sid}`
      }, (payload) => {
        const newMsg = payload.new as RealtimeChatMessage;
        setMessages(prev => {
          // Prevent duplicates if we already added it locally
          if (prev.some(m => m.id === newMsg.id || (m.message === newMsg.message && m.sender_type === newMsg.sender_type && Math.abs(new Date(m.created_at).getTime() - new Date(newMsg.created_at).getTime()) < 2000))) {
            return prev;
          }
          setIsTyping(false); // Stop typing indicator if an admin replied
          return [...prev, newMsg];
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue("");
    setErrorMsg(null);

    const localMsg: RealtimeChatMessage = {
      id: `local-${Date.now()}`,
      sender_type: "visitor",
      message: userMessage,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, localMsg]);
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          message: userMessage,
          timestamp: new Date().toISOString(),
          email: user?.email || "Guest",
          studentName: displayName || "Guest"
        })
      });

      const data = await response.json();

      if (!data.success && data.error) {
        setErrorMsg("Failed to send message to admins.");
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setIsSending(false);
    }

    setIsTyping(true);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-6 p-4 bg-[#185FA5] text-white rounded-full shadow-lg hover:scale-105 transition-transform z-50 ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col h-96">
          <div className="bg-[#185FA5] p-4 text-white flex justify-between items-center shrink-0">
            <h3 className="font-bold">JumpToTech Support</h3>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[var(--background)]">
            {messages.length === 0 && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] rounded-bl-none">
                  Hi! Have any questions about JumpToTech?
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender_type === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender_type === 'visitor' ? 'bg-[#185FA5] text-white rounded-br-none' : 'bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] rounded-bl-none'}`}>
                  {msg.sender_type === "admin" && <div className="text-[10px] text-[#185FA5] font-bold mb-1">Admin</div>}
                  {msg.message}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] rounded-bl-none flex gap-1 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            )}

            {isSending && (
              <div className="flex justify-end">
                <div className="text-xs text-[var(--muted)] flex items-center gap-1">
                  <Loader2 size={12} className="animate-spin" /> Sending...
                </div>
              </div>
            )}
            {errorMsg && (
              <div className="flex justify-center">
                <div className="text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded">
                  {errorMsg}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-[var(--border)] bg-[var(--card-bg)] shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-full px-4 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#185FA5] disabled:opacity-50"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isSending}
              />
              <button
                type="submit"
                className="p-2 bg-[#185FA5] text-white rounded-full hover:bg-[#185FA5]/90 shrink-0 disabled:opacity-50"
                disabled={isSending || !inputValue.trim()}
              >
                {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
