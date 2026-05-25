"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppState } from "@/contexts/AppStateContext";

export default function AdminDashboard() {
  const { loggedIn, role, authMounted } = useAuth();
  const router = useRouter();
  const { modulesData, chatMessages, deleteLecture, addLecture } = useAppState();

  useEffect(() => {
    if (authMounted && (!loggedIn || role !== "admin")) {
      router.push("/");
    }
  }, [authMounted, loggedIn, role, router]);

  if (!authMounted || !loggedIn || role !== "admin") {
    return <div className="p-20 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Manage Lectures</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {modulesData.map(mod => (
              <div key={mod.id} className="border-b border-[var(--border)] pb-4">
                <h3 className="font-medium text-[#185FA5] mb-2">{mod.title}</h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {mod.lectures.map(lec => (
                    <li key={lec.id} className="flex justify-between items-center bg-[var(--background)] p-2 rounded">
                      <span className="line-clamp-1">{lec.title}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => deleteLecture(mod.id, lec.id)}
                          className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded hover:bg-red-500/30 transition shrink-0"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => {
                    const newTitle = window.prompt("Enter new lecture title:");
                    if (newTitle) {
                      addLecture(mod.id, {
                        id: `lec-${Date.now()}`,
                        title: newTitle,
                        duration: "10 min",
                        type: "reading",
                        description: "Newly added lecture."
                      });
                    }
                  }}
                  className="mt-2 text-sm bg-green-500/20 text-green-500 px-3 py-1 rounded hover:bg-green-500/30 transition"
                >
                  + Add Lecture
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Chatbot Messages (Visitor Q&A)</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {chatMessages.filter(m => m.sender === 'user').length === 0 ? (
              <p className="text-[var(--muted)] text-sm">No messages yet. (Messages from chatbot will appear here)</p>
            ) : (
              chatMessages
                .filter(m => m.sender === 'user')
                .map(msg => (
                  <div key={msg.id} className="bg-[var(--background)] p-3 rounded border border-[var(--border)]">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium text-sm text-[#185FA5]">Visitor</p>
                      <p className="text-xs text-[var(--muted)]">{new Date(msg.timestamp).toLocaleString()}</p>
                    </div>
                    <p className="text-sm text-[var(--foreground)]">{msg.text}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
