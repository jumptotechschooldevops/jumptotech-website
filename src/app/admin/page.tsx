"use client";

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
} from "lucide-react";

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

const SESSION_KEY = "jtt_admin_token";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);

  const fetchStudents = useCallback(async (token: string) => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to fetch students");
      setStudents(data.students);
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setAuthed(true);
      fetchStudents(stored);
    }
  }, [fetchStudents]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const res = await fetch("/api/admin/students", {
      headers: { Authorization: `Bearer ${password}` },
    });

    if (res.status === 401) {
      setLoginError("Incorrect password.");
      setLoginLoading(false);
      return;
    }

    const data = await res.json();
    if (!res.ok) {
      setLoginError(data.error ?? "Something went wrong.");
      setLoginLoading(false);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, password);
    setStudents(data.students);
    setAuthed(true);
    setLoginLoading(false);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setStudents([]);
    setPassword("");
  }

  function copyEmail(student: Student) {
    navigator.clipboard.writeText(student.email);
    setCopiedId(student.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  const filtered = students
    .filter((s) => {
      const q = search.toLowerCase();
      return (
        s.full_name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv));
      return sortAsc ? cmp : -cmp;
    });

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
                disabled={loginLoading}
                className="w-full py-3 rounded-xl bg-[#185FA5] text-white font-semibold hover:bg-[#0f4a8a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {loginLoading ? "Verifying..." : "Enter Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return null;
    return sortAsc ? <ChevronUp size={13} className="inline ml-0.5" /> : <ChevronDown size={13} className="inline ml-0.5" />;
  };

  const thClass = "px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--foreground)] select-none whitespace-nowrap";

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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
              <div className="w-10 h-10 rounded-xl bg-[#1D9E75]/10 flex items-center justify-center">
                <Check size={18} className="text-[#1D9E75]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {students.filter((s) => s.status === "active").length}
                </p>
                <p className="text-xs text-[var(--muted)]">Verified</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <RefreshCw size={18} className="text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {students.filter((s) => s.status === "pending").length}
                </p>
                <p className="text-xs text-[var(--muted)]">Pending Verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table card */}
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
                onClick={() => {
                  const stored = sessionStorage.getItem(SESSION_KEY);
                  if (stored) fetchStudents(stored);
                }}
                className="p-2 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-colors"
                title="Refresh"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          {fetchError && (
            <p className="text-red-500 text-sm px-5 py-3 bg-red-500/5 border-b border-[var(--border)]">
              {fetchError}
            </p>
          )}

          {loading ? (
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
                    <th className={thClass} onClick={() => handleSort("full_name")}>
                      Name <SortIcon k="full_name" />
                    </th>
                    <th className={thClass} onClick={() => handleSort("email")}>
                      Email <SortIcon k="email" />
                    </th>
                    <th className={thClass} onClick={() => handleSort("phone")}>
                      Phone <SortIcon k="phone" />
                    </th>
                    <th className={thClass} onClick={() => handleSort("created_at")}>
                      Registered <SortIcon k="created_at" />
                    </th>
                    <th className={thClass} onClick={() => handleSort("last_sign_in_at")}>
                      Last Login <SortIcon k="last_sign_in_at" />
                    </th>
                    <th className={thClass} onClick={() => handleSort("status")}>
                      Status <SortIcon k="status" />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
                      Copy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-[var(--background)] transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--foreground)] whitespace-nowrap">
                        {s.full_name || "—"}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">
                        {s.email}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">
                        {s.phone || "—"}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">
                        {formatDate(s.created_at)}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap">
                        {formatDate(s.last_sign_in_at)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            s.status === "active"
                              ? "bg-[#1D9E75]/10 text-[#1D9E75]"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {s.status === "active" ? "Active" : "Pending"}
                        </span>
                      </td>
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
      </div>
    </div>
  );
}
