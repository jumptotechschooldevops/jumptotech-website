"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAppState, LectureWithVisibility } from "@/contexts/AppStateContext";
import { Eye, EyeOff, GripVertical } from "lucide-react";

export default function AdminDashboard() {
  const { loggedIn, role, authMounted } = useAuth();
  const router = useRouter();
  const {
    modulesData, chatMessages, projects,
    deleteLecture, addLecture, reorderLectures, toggleModulePublish, toggleLectureVisibility, addModule,
    addChatMessage, reviewProject
  } = useAppState();

  const [searchStudent, setSearchStudent] = useState("");
  const dragItem = useRef<{moduleId: string, index: number} | null>(null);
  const dragOverItem = useRef<{moduleId: string, index: number} | null>(null);

  const handleDragStart = (e: React.DragEvent, moduleId: string, index: number) => {
    dragItem.current = { moduleId, index };
  };

  const handleDragEnter = (e: React.DragEvent, moduleId: string, index: number) => {
    dragOverItem.current = { moduleId, index };
  };

  const handleDragEnd = () => {
    if (dragItem.current && dragOverItem.current && dragItem.current.moduleId === dragOverItem.current.moduleId) {
      const moduleId = dragItem.current.moduleId;
      const mod = modulesData.find(m => m.id === moduleId);
      if (mod) {
        const _lectures = [...mod.lectures];
        const dragItemContent = _lectures[dragItem.current.index];
        _lectures.splice(dragItem.current.index, 1);
        _lectures.splice(dragOverItem.current.index, 0, dragItemContent);
        reorderLectures(moduleId, _lectures);
      }
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Student Projects</h2>
            <input
              type="text"
              placeholder="Search students..."
              className="text-sm border border-[var(--border)] rounded px-2 py-1 bg-[var(--background)]"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
            />
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-8">
            {projects.filter(p => p.studentName.toLowerCase().includes(searchStudent.toLowerCase())).length === 0 ? (
              <p className="text-[var(--muted)] text-sm">No matching projects found.</p>
            ) : (
              projects.filter(p => p.studentName.toLowerCase().includes(searchStudent.toLowerCase())).map(proj => (
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

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Lectures</h2>
            <button
              className="text-sm bg-[#185FA5] text-white px-3 py-1.5 rounded font-medium hover:bg-[#185FA5]/90"
              onClick={() => {
                const title = window.prompt("Enter new module title:");
                if (title) {
                  addModule({
                    id: `mod-${Date.now()}`,
                    slug: title.toLowerCase().replace(/\s+/g, '-'),
                    title,
                    icon: "Folder",
                    description: "New module.",
                    color: "from-gray-500 to-gray-700",
                    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
                    lectureCount: 0,
                    labCount: 0,
                    lectures: [],
                    isPublished: true,
                    totalHours: 0,
                    mkdocsUrl: "",
                    labs: []
                  });
                }
              }}
            >
              + Create Module
            </button>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {modulesData.map(mod => (
              <div key={mod.id} className={`border border-[var(--border)] p-4 rounded-xl ${mod.isPublished === false ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-[#185FA5]">{mod.title}</h3>
                    <span className="text-xs text-[var(--muted)]">{mod.lectures.length} lessons</span>
                  </div>
                  <div className="flex gap-2">
                    <label className="text-xs cursor-pointer bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                      Upload Img
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          alert("Thumbnail upload simulated for " + e.target.files[0].name);
                        }
                      }} />
                    </label>
                    <button
                      onClick={() => toggleModulePublish(mod.id)}
                      className="text-xs bg-[var(--background)] border border-[var(--border)] px-2 py-1 rounded"
                    >
                      {mod.isPublished === false ? 'Publish' : 'Unpublish'}
                    </button>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {mod.lectures.map((lec, index) => (
                    <li
                      key={lec.id}
                      className="flex justify-between items-center bg-[var(--background)] p-2 rounded border border-[var(--border)] cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, mod.id, index)}
                      onDragEnter={(e) => handleDragEnter(e, mod.id, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={14} className="text-gray-400" />
                        <span className={`line-clamp-1 ${(lec as LectureWithVisibility).isVisible === false ? 'line-through opacity-50' : ''}`}>{lec.title}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleLectureVisibility(mod.id, lec.id)}
                          className="text-[var(--muted)] hover:text-[var(--foreground)]"
                          title={(lec as LectureWithVisibility).isVisible === false ? "Show" : "Hide"}
                        >
                          {(lec as LectureWithVisibility).isVisible === false ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button
                          onClick={() => deleteLecture(mod.id, lec.id)}
                          className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded hover:bg-red-500/20 transition shrink-0"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
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
          <h2 className="text-xl font-semibold mb-4 shrink-0">Chatbot Dashboard (Telegram Managed)</h2>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 mb-4 flex flex-col justify-center items-center text-center">
            <div className="bg-[#185FA5]/10 border border-[#185FA5]/20 p-6 rounded-2xl max-w-sm">
              <h3 className="font-bold text-[#185FA5] mb-2">Live Chat is active</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Visitor messages are now securely forwarded to the designated Telegram group.
              </p>
              <p className="text-sm text-[var(--foreground)]">
                To reply to a student, simply <strong>Reply</strong> to their message directly in Telegram.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
