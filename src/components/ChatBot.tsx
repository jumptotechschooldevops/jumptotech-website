"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useAppState } from "@/contexts/AppStateContext";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { chatMessages, addChatMessage } = useAppState();

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    addChatMessage({
      id: `msg-${Date.now()}`,
      sender: "user",
      text: inputValue,
      timestamp: new Date().toISOString()
    });

    // Process bot response
    const query = inputValue.toLowerCase();
    let response = "I'll pass this question to our admins! They will see it in their dashboard.";

    if (query.includes("price") || query.includes("cost")) {
      response = "The bootcamp costs $700/mo or $5,000 total.";
    } else if (query.includes("duration") || query.includes("how long")) {
      response = "The program is 7 months long.";
    } else if (query.includes("start") || query.includes("when")) {
      response = "Batch 4 starts June 1, 2026!";
    }

    setInputValue("");

    // Simulate delay for bot reply
    setTimeout(() => {
      addChatMessage({
        id: `msg-${Date.now()}`,
        sender: "bot",
        text: response,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  };

  const displayMessages = chatMessages.length > 0
    ? chatMessages
    : [{ id: "welcome", sender: "bot" as const, text: "Hi! Have any questions about JumpToTech?", timestamp: new Date().toISOString() }];

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
            {displayMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-[#185FA5] text-white rounded-br-none' : 'bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] rounded-bl-none'}`}>
                  {msg.sender === "admin" && <div className="text-[10px] text-[#185FA5] font-bold mb-1">Admin</div>}
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-[var(--border)] bg-[var(--card-bg)] shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-full px-4 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#185FA5]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="p-2 bg-[#185FA5] text-white rounded-full hover:bg-[#185FA5]/90 shrink-0">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
