"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppState } from "@/contexts/AppStateContext";

export default function AdminDashboard() {
  const { loggedIn, role, authMounted } = useAuth();
  const router = useRouter();
  const { modulesData, chatMessages, projects, deleteLecture, addLecture, addChatMessage, reviewProject } = useAppState();

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
          <h2 className="text-xl font-semibold mb-4">Student Project Submissions</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-8">
            {projects.length === 0 ? (
              <p className="text-[var(--muted)] text-sm">No projects submitted yet.</p>
            ) : (
              projects.map(proj => (
                <div key={proj.id} className="border border-[var(--border)] bg-[var(--background)] p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-[var(--foreground)]">{proj.studentName}</p>
                      <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#185FA5] hover:underline break-all">
                        {proj.url}
                      </a>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${proj.status === "reviewed" ? "bg-[#1D9E75]/10 text-[#1D9E75] border-[#1D9E75]/30" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"}`}>
                      {proj.status === "reviewed" ? "Reviewed" : "Pending"}
                    </span>
                  </div>
                  {proj.description && <p className="text-sm text-[var(--muted)] mb-3">{proj.description}</p>}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.currentTarget.elements.namedItem("feedback") as HTMLInputElement;
                      if (input.value.trim()) {
                        reviewProject(proj.id, input.value);
                      }
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      name="feedback"
                      defaultValue={proj.feedback}
                      placeholder="Add feedback..."
                      className="flex-1 bg-[var(--card-bg)] border border-[var(--border)] rounded px-3 py-1.5 text-sm"
                    />
                    <button type="submit" className="bg-[#1D9E75] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-[#1D9E75]/90">
                      Save Review
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>

          <h2 className="text-xl font-semibold mb-4">Manage Lectures</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
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
                <div className="mt-2 flex gap-2">
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
                    className="text-sm bg-green-500/20 text-green-500 px-3 py-1 rounded hover:bg-green-500/30 transition"
                  >
                    + Add Lecture
                  </button>
                  <button
                    onClick={() => {
                      const newTitle = window.prompt("Enter new lab title:");
                      if (newTitle) {
                        addLecture(mod.id, {
                          id: `lab-${Date.now()}`,
                          title: newTitle,
                          duration: "30 min",
                          type: "lab",
                          description: "Newly added lab."
                        });
                      }
                    }}
                    className="text-sm bg-blue-500/20 text-blue-500 px-3 py-1 rounded hover:bg-blue-500/30 transition"
                  >
                    + Add Lab
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-4 shrink-0">Chatbot Messages (Visitor Q&A)</h2>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 mb-4">
            {chatMessages.length === 0 ? (
              <p className="text-[var(--muted)] text-sm">No messages yet. (Messages from chatbot will appear here)</p>
            ) : (
              chatMessages
                .map(msg => (
                  <div key={msg.id} className={`p-3 rounded border border-[var(--border)] ${msg.sender === "admin" ? "bg-[#185FA5]/10 ml-8" : "bg-[var(--background)] mr-8"}`}>
                    <div className="flex justify-between items-center mb-1">
                      <p className={`font-medium text-sm ${msg.sender === "admin" ? "text-[#185FA5]" : "text-[#1D9E75]"}`}>{msg.sender === "admin" ? "Admin (You)" : "Visitor"}</p>
                      <p className="text-xs text-[var(--muted)]">{new Date(msg.timestamp).toLocaleString()}</p>
                    </div>
                    <p className="text-sm text-[var(--foreground)]">{msg.text}</p>
                  </div>
                ))
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem("reply") as HTMLInputElement;
              if (input.value.trim()) {
                addChatMessage({
                  id: `msg-${Date.now()}`,
                  sender: "admin",
                  text: input.value,
                  timestamp: new Date().toISOString()
                });
                input.value = "";
              }
            }}
            className="flex gap-2 mt-auto pt-4 border-t border-[var(--border)] shrink-0"
          >
            <input type="text" name="reply" placeholder="Reply to visitor..." className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm" />
            <button type="submit" className="bg-[#185FA5] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#185FA5]/90">Reply</button>
          </form>
        </div>
      </div>
    </div>
  );
}
