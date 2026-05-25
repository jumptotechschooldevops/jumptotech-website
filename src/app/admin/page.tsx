"use client";

/*
 * Run this SQL in Supabase SQL editor before using this dashboard:
 *
 * -- Profiles table (students):
 * CREATE TABLE IF NOT EXISTS profiles (
 *   id UUID PRIMARY KEY,
 *   full_name TEXT,
 *   email TEXT,
 *   phone TEXT,
 *   experience_level TEXT,
 *   how_heard TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Admin can read all profiles" ON profiles FOR SELECT USING (true);
 * CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (true);
 *
 * -- Lectures table:
 * CREATE TABLE IF NOT EXISTS lectures (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   module_slug TEXT NOT NULL,
 *   title TEXT NOT NULL,
 *   description TEXT,
 *   content TEXT,
 *   duration TEXT DEFAULT '30 min',
 *   type TEXT DEFAULT 'reading',
 *   order_index INTEGER DEFAULT 0,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Anyone can read lectures" ON lectures FOR SELECT USING (true);
 * CREATE POLICY "Admin can manage lectures" ON lectures FOR ALL USING (true);
 */

import { useState, useEffect, useCallback } from "react";
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
  Pencil,
  Trash2,
  X,
  Save,
  GraduationCap,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const ADMIN_PASSWORD = "JumpToTech2026Admin!";
const AUTH_KEY = "admin_auth";

// ── Types ──────────────────────────────────────────────────────────────────

interface Student {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  experience_level: string;
  how_heard: string;
  created_at: string;
}

interface DbLecture {
  id: string;
  module_slug: string;
  title: string;
  description: string | null;
  content: string | null;
  duration: string;
  type: string;
  order_index: number;
  created_at: string;
}

interface LectureFormData {
  title: string;
  description: string;
  content: string;
  duration: string;
  type: string;
  order_index: number;
}

type SortKey = keyof Student;

// ── Module list ────────────────────────────────────────────────────────────

const MODULE_OPTIONS = [
  { slug: "git", label: "Git & Version Control" },
  { slug: "linux", label: "Linux Fundamentals" },
  { slug: "networking", label: "Networking" },
  { slug: "docker", label: "Docker & Containers" },
  { slug: "kubernetes", label: "Kubernetes" },
  { slug: "cicd", label: "CI/CD" },
  { slug: "terraform", label: "Terraform & IaC" },
  { slug: "monitoring", label: "Monitoring" },
  { slug: "aws", label: "AWS" },
  { slug: "ansible", label: "Ansible" },
  { slug: "kafka", label: "Kafka" },
  { slug: "azure", label: "Azure" },
  { slug: "prometheus-grafana", label: "Prometheus & Grafana" },
];

const EMPTY_FORM: LectureFormData = {
  title: "",
  description: "",
  content: "",
  duration: "30 min",
  type: "reading",
  order_index: 0,
};

// ── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── Main component ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"students" | "lectures">("students");

  // Students state
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState("");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);

  // Lectures state
  const [lectureModule, setLectureModule] = useState("git");
  const [lectures, setLectures] = useState<DbLecture[]>([]);
  const [lecturesLoading, setLecturesLoading] = useState(false);
  const [lecturesError, setLecturesError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<LectureFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── Students ───────────────────────────────────────────────────────────

  const fetchStudents = useCallback(async () => {
    setStudentsLoading(true);
    setStudentsError("");
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone, experience_level, how_heard, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setStudents(data ?? []);
    } catch (e) {
      setStudentsError(e instanceof Error ? e.message : "Failed to load students");
    } finally {
      setStudentsLoading(false);
    }
  }, []);

  // ── Lectures ───────────────────────────────────────────────────────────

  const fetchLectures = useCallback(async (slug: string) => {
    setLecturesLoading(true);
    setLecturesError("");
    try {
      const { data, error } = await supabase
        .from("lectures")
        .select("*")
        .eq("module_slug", slug)
        .order("order_index", { ascending: true });
      if (error) throw error;
      setLectures(data ?? []);
    } catch (e) {
      setLecturesError(e instanceof Error ? e.message : "Failed to load lectures");
    } finally {
      setLecturesLoading(false);
    }
  }, []);

  // ── Auth & init ────────────────────────────────────────────────────────

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored === ADMIN_PASSWORD) {
      setAuthed(true);
      fetchStudents();
    }
  }, [fetchStudents]);

  useEffect(() => {
    if (authed && activeTab === "lectures") {
      fetchLectures(lectureModule);
    }
  }, [authed, activeTab, lectureModule, fetchLectures]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, password);
      setAuthed(true);
      fetchStudents();
    } else {
      setLoginError("Incorrect password.");
    }
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setStudents([]);
    setPassword("");
  }

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
      const cmp = String(av).localeCompare(String(bv));
      return sortAsc ? cmp : -cmp;
    });

  // ── Lecture helpers ────────────────────────────────────────────────────

  function openAddForm() {
    setEditingId(null);
    setFormData({ ...EMPTY_FORM, order_index: lectures.length });
    setSaveError("");
    setShowForm(true);
  }

  function openEditForm(lecture: DbLecture) {
    setEditingId(lecture.id);
    setFormData({
      title: lecture.title,
      description: lecture.description ?? "",
      content: lecture.content ?? "",
      duration: lecture.duration,
      type: lecture.type,
      order_index: lecture.order_index,
    });
    setSaveError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setSaveError("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim()) {
      setSaveError("Title is required.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      if (editingId) {
        const { error } = await supabase
          .from("lectures")
          .update({
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            content: formData.content.trim() || null,
            duration: formData.duration.trim(),
            type: formData.type,
            order_index: formData.order_index,
          })
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("lectures").insert({
          module_slug: lectureModule,
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          content: formData.content.trim() || null,
          duration: formData.duration.trim(),
          type: formData.type,
          order_index: formData.order_index,
        });
        if (error) throw error;
      }
      closeForm();
      fetchLectures(lectureModule);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Failed to save lecture");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const { error } = await supabase.from("lectures").delete().eq("id", id);
      if (error) throw error;
      setLectures((prev) => prev.filter((l) => l.id !== id));
    } catch (e) {
      setLecturesError(e instanceof Error ? e.message : "Failed to delete lecture");
    } finally {
      setDeletingId(null);
    }
  }

  // ── Login gate ─────────────────────────────────────────────────────────

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
        <div className="w-full max-w-sm">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-[var(--foreground)]">Admin Access</h1>
              <p className="text-[var(--muted)] text-sm mt-1">JumpToTech Dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    required
                    placeholder="Admin password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    aria-label={showPw ? "Hide" : "Show"}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#185FA5] text-white font-semibold hover:bg-[#0f4a8a] transition-colors text-sm"
              >
                Enter Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Sort icon ──────────────────────────────────────────────────────────

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return null;
    return sortAsc ? (
      <ChevronUp size={13} className="inline ml-0.5" />
    ) : (
      <ChevronDown size={13} className="inline ml-0.5" />
    );
  };

  const thClass =
    "px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] select-none whitespace-nowrap";

  // ── Dashboard ──────────────────────────────────────────────────────────

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
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-1 w-fit">
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
        </div>

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
                        <th className={thClass} onClick={() => handleSort("full_name")}>Name <SortIcon k="full_name" /></th>
                        <th className={thClass} onClick={() => handleSort("email")}>Email <SortIcon k="email" /></th>
                        <th className={thClass} onClick={() => handleSort("phone")}>Phone <SortIcon k="phone" /></th>
                        <th className={thClass} onClick={() => handleSort("experience_level")}>Experience <SortIcon k="experience_level" /></th>
                        <th className={thClass} onClick={() => handleSort("how_heard")}>How Heard <SortIcon k="how_heard" /></th>
                        <th className={thClass} onClick={() => handleSort("created_at")}>Registered <SortIcon k="created_at" /></th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Copy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {filtered.map((s) => (
                        <tr key={s.id} className="hover:bg-[var(--background)] transition-colors">
                          <td className="px-4 py-3 font-medium text-[var(--foreground)] whitespace-nowrap">{s.full_name || "—"}</td>
                          <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">{s.email || "—"}</td>
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
            {/* Controls row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <select
                value={lectureModule}
                onChange={(e) => {
                  setLectureModule(e.target.value);
                  setShowForm(false);
                }}
                className="px-3 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--card-bg)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors"
              >
                {MODULE_OPTIONS.map((m) => (
                  <option key={m.slug} value={m.slug}>{m.label}</option>
                ))}
              </select>
              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  onClick={() => fetchLectures(lectureModule)}
                  className="p-2 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={14} className={lecturesLoading ? "animate-spin" : ""} />
                </button>
                <button
                  onClick={openAddForm}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#185FA5] text-white text-sm font-semibold hover:bg-[#0f4a8a] transition-colors"
                >
                  <Plus size={15} />
                  Add New Lecture
                </button>
              </div>
            </div>

            {lecturesError && (
              <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {lecturesError}
              </p>
            )}

            {/* Add / Edit form */}
            {showForm && (
              <div className="bg-[var(--card-bg)] border border-[#185FA5]/30 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {editingId ? "Edit Lecture" : "New Lecture"}
                  </h3>
                  <button
                    onClick={closeForm}
                    className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--muted-bg)] transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1.5">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                      placeholder="e.g. Introduction to Docker"
                      autoFocus
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1.5">
                      Description
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Short summary shown in the lecture list"
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1.5">
                      Content <span className="font-normal normal-case text-[var(--muted)]">(supports Markdown)</span>
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
                      placeholder="Full lecture content in Markdown…"
                      rows={8}
                      className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm font-mono resize-y"
                    />
                  </div>

                  {/* Duration / Type / Order row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1.5">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData((p) => ({ ...p, duration: e.target.value }))}
                        placeholder="30 min"
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1.5">
                        Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                      >
                        <option value="reading">Reading</option>
                        <option value="video">Video</option>
                        <option value="lab">Lab</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1.5">
                        Order
                      </label>
                      <input
                        type="number"
                        value={formData.order_index}
                        onChange={(e) => setFormData((p) => ({ ...p, order_index: Number(e.target.value) }))}
                        min={0}
                        className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {saveError && (
                    <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                      {saveError}
                    </p>
                  )}

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#185FA5] text-white text-sm font-semibold hover:bg-[#0f4a8a] disabled:opacity-50 transition-colors"
                    >
                      {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                      {saving ? "Saving…" : "Save Lecture"}
                    </button>
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Lectures list */}
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                <h2 className="font-semibold text-[var(--foreground)]">
                  {MODULE_OPTIONS.find((m) => m.slug === lectureModule)?.label}
                </h2>
                <span className="text-xs text-[var(--muted)]">
                  {lectures.length} lecture{lectures.length !== 1 ? "s" : ""}
                </span>
              </div>

              {lecturesLoading ? (
                <div className="flex items-center justify-center py-16 text-[var(--muted)] text-sm gap-2">
                  <RefreshCw size={16} className="animate-spin" />
                  Loading lectures…
                </div>
              ) : lectures.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-[var(--muted)] text-sm gap-3">
                  <BookOpen size={32} className="opacity-30" />
                  <p>No lectures yet for this module.</p>
                  <button
                    onClick={openAddForm}
                    className="flex items-center gap-1.5 text-[#185FA5] hover:underline text-sm font-medium"
                  >
                    <Plus size={14} />
                    Add the first lecture
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className="flex items-start gap-4 px-5 py-4 hover:bg-[var(--background)] transition-colors"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[var(--muted-bg)] flex items-center justify-center text-xs font-bold text-[var(--muted)] mt-0.5">
                        {lecture.order_index}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--foreground)] truncate">{lecture.title}</p>
                        {lecture.description && (
                          <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-1">{lecture.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                            lecture.type === "lab"
                              ? "bg-[#1D9E75]/15 text-[#1D9E75]"
                              : lecture.type === "video"
                              ? "bg-purple-500/15 text-purple-500"
                              : "bg-[var(--muted-bg)] text-[var(--muted)]"
                          }`}>
                            {lecture.type}
                          </span>
                          <span className="text-[10px] text-[var(--muted)]">{lecture.duration}</span>
                          {lecture.content && (
                            <span className="text-[10px] text-[#1D9E75]">has content</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openEditForm(lecture)}
                          className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[#185FA5] hover:bg-[#185FA5]/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(lecture.id)}
                          disabled={deletingId === lecture.id}
                          className="p-1.5 rounded-lg text-[var(--muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === lecture.id ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
