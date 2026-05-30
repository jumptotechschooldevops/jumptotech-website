"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAppState, LectureWithVisibility } from "@/contexts/AppStateContext";
import {
  Shield,
  Eye,
  EyeOff,
  Users,
  Search,
  Copy,
  Check,
  RefreshCw,
  LogOut,
  ChevronUp,
  ChevronDown,
  BookOpen,
  Plus,
  Trash2,
  Pencil,
  Save,
  GraduationCap,
  GripVertical
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Student {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  experience_level: string;
  how_heard: string;
  created_at: string;
  last_sign_in_at: string | null;
  status: "active" | "pending";
}

type SortKey = keyof Student;

const MODULE_OPTIONS = [
  { slug: "git", label: "Git & Version Control" },
  { slug: "linux", label: "Linux & Scripting" },
  { slug: "networking", label: "Computer Networking" },
  { slug: "python", label: "Python for DevOps" },
  { slug: "docker", label: "Docker & Containerization" },
  { slug: "kubernetes", label: "Kubernetes (CKS/CKA)" },
  { slug: "aws", label: "AWS Cloud Platform" },
  { slug: "terraform", label: "Terraform & IaC" },
  { slug: "ansible", label: "Ansible Config Management" },
  { slug: "jenkins", label: "Jenkins CI/CD" },
  { slug: "github-actions", label: "GitHub Actions CI/CD" },
  { slug: "monitoring", label: "Monitoring (Prometheus/Grafana)" },
  { slug: "elk", label: "Logging (ELK/EFK)" },
  { slug: "kafka", label: "Apache Kafka" },
  { slug: "azure", label: "Azure Cloud Platform" },
  { slug: "gcp", label: "Google Cloud Platform" },
  { slug: "security", label: "DevSecOps & Security" },
  { slug: "sre", label: "SRE Practices" },
];

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function SortIcon({ k, sortKey, sortAsc }: { k: string, sortKey: string, sortAsc: boolean }) {
  if (sortKey !== k) return null;
  return sortAsc ? (
    <ChevronUp size={13} className="inline ml-0.5" />
  ) : (
    <ChevronDown size={13} className="inline ml-0.5" />
  );
}

export default function AdminPage() {
  const { loggedIn, role, authMounted } = useAuth();
  const router = useRouter();
  const {
    modulesData, chatMessages, projects,
    deleteLecture, addLecture, reorderLectures, toggleModulePublish, toggleLectureVisibility, addModule,
    addChatMessage, reviewProject
  } = useAppState();

  const dragItem = useRef<{moduleId: string, index: number} | null>(null);
  const dragOverItem = useRef<{moduleId: string, index: number} | null>(null);

  const [activeTab, setActiveTab] = useState<"dashboard" | "students" | "registrations" | "chat" | "lectures" | "projects">("dashboard");

  // Students state
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState("");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);

  // ── Students ───────────────────────────────────────────────────────────

  const fetchStudents = useCallback(async () => {
    setStudentsLoading(true);
    setStudentsError("");
    try {
      const res = await fetch("/api/admin/students", {
        headers: {
          Authorization: `Bearer ${((await supabase.auth.getSession()).data.session?.access_token) || ''}`
        }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load students");
      setStudents(json.students ?? []);
    } catch (e) {
      setStudentsError(e instanceof Error ? e.message : "Failed to load students");
    } finally {
      setStudentsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ── Student helpers ────────────────────────────────────────────────────

  function copyEmail(student: Student) {
    navigator.clipboard.writeText(student.email);
    setCopiedId(student.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

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

  const filtered = students
    .filter((s) => {
      const q = search.toLowerCase();
      return (
        (s.full_name ?? "").toLowerCase().includes(q) ||
        (s.email ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (av === bv) return 0;
      let cmp = 0;
      if (typeof av === "string" && typeof bv === "string") {
        cmp = av.localeCompare(bv);
      } else {
        cmp = av > bv ? 1 : -1;
      }
      return sortAsc ? cmp : -cmp;
    });

  const thClass =
    "px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] select-none whitespace-nowrap";

  // ── Dashboard ──────────────────────────────────────────────────────────


  if (!authMounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!loggedIn || role !== "admin") {
    console.log("Access Denied Redirect Reason: User not logged in or not admin. role:", role);
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
        <Shield size={64} className="text-red-500 mb-6" />
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Access Denied</h1>
        <p className="text-[var(--muted)] mb-8 text-center max-w-md">
          You do not have the required permissions to view this page. Please log in with an administrator account.
        </p>
        <button onClick={() => router.push("/")} className="px-6 py-3 bg-[#185FA5] text-white rounded-xl font-medium hover:bg-[#185FA5]/90 transition-colors">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--foreground)]">Admin Dashboard</h1>
              <p className="text-xs text-[var(--muted)]">JumpToTech DevOps School</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "dashboard"
                ? "bg-[#185FA5] text-white shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "students"
                ? "bg-[#185FA5] text-white shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Users size={15} />
            Students
            <span className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${activeTab === "students" ? "bg-white/20 text-white" : "bg-[var(--muted-bg)] text-[var(--muted)]"}`}>
              {students.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("registrations")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "registrations"
                ? "bg-[#185FA5] text-white shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Registrations
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "chat"
                ? "bg-[#185FA5] text-white shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Chat Messages
          </button>
          <button
            onClick={() => setActiveTab("lectures")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "lectures"
                ? "bg-[#185FA5] text-white shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <BookOpen size={15} />
            Lectures
          </button>
          <button
            onClick={() => router.push("/admin/projects")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Student Projects
          </button>
        </div>

        {/* ── DASHBOARD TAB ── */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#185FA5]/10 flex items-center justify-center">
                  <Users size={18} className="text-[#185FA5]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{students.length}</p>
                  <p className="text-xs text-[var(--muted)]">Total Students</p>
                </div>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#185FA5]/10 flex items-center justify-center">
                  <Users size={18} className="text-[#185FA5]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{students.length}</p>
                  <p className="text-xs text-[var(--muted)]">Total Registrations</p>
                </div>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#185FA5]/10 flex items-center justify-center">
                  <Users size={18} className="text-[#185FA5]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{chatMessages.length}</p>
                  <p className="text-xs text-[var(--muted)]">Total Chat Messages</p>
                </div>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#185FA5]/10 flex items-center justify-center">
                  <Users size={18} className="text-[#185FA5]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{projects.length}</p>
                  <p className="text-xs text-[var(--muted)]">Total Projects</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── REGISTRATIONS TAB ── */}
        {activeTab === "registrations" && (
          <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Website Registrations</h2>
            <p className="text-sm text-[var(--muted)] mb-4">Currently mirroring the Students table data.</p>
            {studentsError && (
              <p className="text-red-500 text-sm px-5 py-3 bg-red-500/5 border border-[var(--border)] rounded-lg mb-4">
                {studentsError}
              </p>
            )}
            {studentsLoading ? (
              <div className="flex items-center justify-center py-16 text-[var(--muted)] text-sm gap-2">
                <RefreshCw size={16} className="animate-spin" />
                Loading registrations...
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex items-center justify-center py-16 text-[var(--muted)] text-sm">
                No registrations found.
              </div>
            ) : (
              <div className="overflow-x-auto border border-[var(--border)] rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--background)] border-b border-[var(--border)]">
                    <tr>
                      <th className={thClass} onClick={() => handleSort("full_name")}>Name <SortIcon k="full_name" sortKey={sortKey} sortAsc={sortAsc} /></th>
                      <th className={thClass} onClick={() => handleSort("email")}>Email <SortIcon k="email" sortKey={sortKey} sortAsc={sortAsc} /></th>
                      <th className={thClass} onClick={() => handleSort("phone")}>Phone <SortIcon k="phone" sortKey={sortKey} sortAsc={sortAsc} /></th>
                      <th className={thClass} onClick={() => handleSort("created_at")}>Registered <SortIcon k="created_at" sortKey={sortKey} sortAsc={sortAsc} /></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {filtered.map((s) => (
                      <tr key={s.id} className="hover:bg-[var(--background)] transition-colors">
                        <td className="px-4 py-3 font-medium text-[var(--foreground)] whitespace-nowrap">{s.full_name || "—"}</td>
                        <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">{s.email}</td>
                        <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">{s.phone || "—"}</td>
                        <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">{formatDate(s.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── CHAT MESSAGES TAB ── */}
        {activeTab === "chat" && (
          <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl flex flex-col h-[600px]">
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

            <div className="mt-8 border-t border-[var(--border)] pt-6 flex-1 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 shrink-0">Chatbot Messages (Local Log)</h2>
              <div className="space-y-4 pr-2 mb-4">
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
                <input type="text" name="reply" placeholder="Reply to visitor (Local only)..." className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm" />
                <button type="submit" className="bg-[#185FA5] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#185FA5]/90">Reply Local</button>
              </form>
            </div>
          </div>
        )}

        {/* ── STUDENTS TAB ── */}
        {activeTab === "students" && (
          <>
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 mb-6 inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#185FA5]/10 flex items-center justify-center">
                <GraduationCap size={18} className="text-[#185FA5]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{students.length}</p>
                <p className="text-xs text-[var(--muted)]">Total Students</p>
              </div>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
                <h2 className="font-semibold text-[var(--foreground)] flex-1">Students</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search name or email…"
                      className="pl-8 pr-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors w-52"
                    />
                  </div>
                  <button
                    onClick={fetchStudents}
                    className="p-2 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-colors"
                    title="Refresh"
                  >
                    <RefreshCw size={14} className={studentsLoading ? "animate-spin" : ""} />
                  </button>
                </div>
              </div>

              {studentsError && (
                <p className="text-red-500 text-sm px-5 py-3 bg-red-500/5 border-b border-[var(--border)]">
                  {studentsError}
                </p>
              )}

              {studentsLoading ? (
                <div className="flex items-center justify-center py-16 text-[var(--muted)] text-sm gap-2">
                  <RefreshCw size={16} className="animate-spin" />
                  Loading students…
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex items-center justify-center py-16 text-[var(--muted)] text-sm">
                  {search ? "No students match your search." : "No students yet."}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[var(--background)] border-b border-[var(--border)]">
                      <tr>
                        <th className={thClass} onClick={() => handleSort("full_name")}>Name <SortIcon k="full_name" sortKey={sortKey} sortAsc={sortAsc} /></th>
                        <th className={thClass} onClick={() => handleSort("email")}>Email <SortIcon k="email" sortKey={sortKey} sortAsc={sortAsc} /></th>
                        <th className={thClass} onClick={() => handleSort("phone")}>Phone <SortIcon k="phone" sortKey={sortKey} sortAsc={sortAsc} /></th>
                        <th className={thClass} onClick={() => handleSort("experience_level")}>Experience <SortIcon k="experience_level" sortKey={sortKey} sortAsc={sortAsc} /></th>
                        <th className={thClass} onClick={() => handleSort("how_heard")}>How Heard <SortIcon k="how_heard" sortKey={sortKey} sortAsc={sortAsc} /></th>
                        <th className={thClass} onClick={() => handleSort("created_at")}>Registered <SortIcon k="created_at" sortKey={sortKey} sortAsc={sortAsc} /></th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Copy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {filtered.map((s) => (
                        <tr key={s.id} className="hover:bg-[var(--background)] transition-colors">
                          <td className="px-4 py-3 font-medium text-[var(--foreground)] whitespace-nowrap">{s.full_name || "—"}</td>
                          <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">{s.email}</td>
                          <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">{s.phone || "—"}</td>
                          <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">{s.experience_level || "—"}</td>
                          <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">{s.how_heard || "—"}</td>
                          <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">{formatDate(s.created_at)}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => copyEmail(s)}
                              className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
                              title="Copy email"
                            >
                              {copiedId === s.id ? (
                                <Check size={14} className="text-[#1D9E75]" />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-5 py-3 border-t border-[var(--border)] text-xs text-[var(--muted)]">
                    Showing {filtered.length} of {students.length} students
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── LECTURES TAB ── */}
        {activeTab === "lectures" && (
          <div className="space-y-4">
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
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
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
        )}

      </div>
    </div>
  );
}
