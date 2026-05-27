"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Module, Lecture } from "@/lib/data";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  PlayCircle,
  Award,
} from "lucide-react";

interface Props {
  module: Module;
  lectureId: string;
  initialContent: string | null;
}

const mdComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => <h1 className="md-h1">{children}</h1>,
  h2: ({ children }: { children?: React.ReactNode }) => <h2 className="md-h2">{children}</h2>,
  h3: ({ children }: { children?: React.ReactNode }) => <h3 className="md-h3">{children}</h3>,
  h4: ({ children }: { children?: React.ReactNode }) => <h4 className="md-h4">{children}</h4>,
  h5: ({ children }: { children?: React.ReactNode }) => <h5 className="md-h5">{children}</h5>,
  p: ({ children }: { children?: React.ReactNode }) => <p className="md-p">{children}</p>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul className="md-ul">{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol className="md-ol">{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li className="md-li">{children}</li>,
  blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="md-blockquote">{children}</blockquote>,
  hr: () => <hr className="md-hr" />,
  pre: ({ children }: { children?: React.ReactNode }) => <pre className="md-pre">{children}</pre>,
  code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) =>
    inline
      ? <code className="md-inline-code">{children}</code>
      : <code className="md-code">{children}</code>,
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="md-table-wrap"><table className="md-table">{children}</table></div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => <th className="md-th">{children}</th>,
  td: ({ children }: { children?: React.ReactNode }) => <td className="md-td">{children}</td>,
  tr: ({ children }: { children?: React.ReactNode }) => <tr className="md-tr">{children}</tr>,
};

export function LecturePageClient({ module: mod, lectureId, initialContent }: Props) {
  const router = useRouter();
  const { mounted, completedLectures, completedLabs, toggleLecture } = useProgress(mod.id);
  const { loggedIn, mounted: authMounted } = useAuth();

  const [dbLectures, setDbLectures] = useState<Lecture[]>([]);
  const [dbContent, setDbContent] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("lectures")
      .select("id, title, description, type, order_index, content")
      .eq("module_slug", mod.slug)
      .order("order_index", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setDbLectures(
            data.map((l: { id: string; title: string; description: string | null; type: string; order_index: number; content?: string }) => ({
              id: l.id,
              title: l.title,
              description: l.description ?? "",
              type: (["lab", "video"].includes(l.type) ? l.type : "reading") as "reading" | "lab" | "video",
              content: l.content,
            }))
          );
          const match = data.find((l: any) => l.id === lectureId);

if (match && "content" in match) {
  setDbContent(match.content);
}
        }
      });
  }, [mod.slug, lectureId]);

  useEffect(() => {
    if (authMounted && !loggedIn) router.replace("/login");
  }, [authMounted, loggedIn, router]);

  // Merge db lectures + static lectures (db first, no duplicates)
  const dbIds = new Set(dbLectures.map((l) => l.id));
  const allLectures = [...dbLectures, ...mod.lectures.filter((l) => !dbIds.has(l.id))];

  // Find the current lecture
  const lecture = allLectures.find((l) => l.id === lectureId) ?? mod.lectures.find((l) => l.id === lectureId);
  const currentIdx = allLectures.findIndex((l) => l.id === lectureId);
  const prevLecture = currentIdx > 0 ? allLectures[currentIdx - 1] : null;
  const nextLecture = currentIdx >= 0 && currentIdx < allLectures.length - 1 ? allLectures[currentIdx + 1] : null;

  const isCompleted = mounted && completedLectures.includes(lectureId);
  const totalItems = allLectures.length + mod.labCount;
  const completedCount = completedLectures.length + completedLabs.length;
  const progressPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // Content priority: Supabase live > Supabase fetched > static data.ts
  const content = dbContent ?? initialContent ?? lecture?.content ?? lecture?.description ?? "";

  const handleMarkComplete = () => {
    if (!mounted) return;
    toggleLecture(lectureId);
    if (!isCompleted && nextLecture) {
      setTimeout(() => router.push(`/modules/${mod.slug}/${nextLecture.id}`), 300);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <div className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href={`/modules/${mod.slug}`}
            className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">{mod.title}</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="flex-1 min-w-0 text-center">
            <p className="text-xs font-semibold text-[var(--muted)] truncate">{mod.title}</p>
          </div>

          {/* Progress pill */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-1.5 w-24 bg-[var(--border)] rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: mounted ? `${progressPct}%` : "0%", backgroundColor: progressPct === 100 ? "#1D9E75" : "#185FA5" }}
              />
            </div>
            <span className="text-xs font-bold text-[var(--muted)]">{mounted ? progressPct : 0}%</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto flex">
        {/* LEFT SIDEBAR — lecture list */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 border-r border-[var(--border)] min-h-[calc(100vh-53px)] sticky top-[53px] h-[calc(100vh-53px)] overflow-y-auto">
          <div className="p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3 px-1">
              Lectures
            </p>
            <div className="space-y-0.5">
              {allLectures.map((lec, idx) => {
                const isCurrent = lec.id === lectureId;
                const isDone = mounted && completedLectures.includes(lec.id);
                return (
                  <Link
                    key={lec.id}
                    href={`/modules/${mod.slug}/${lec.id}`}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-all group ${
                      isCurrent
                        ? "bg-[#185FA5]/15 border border-[#185FA5]/30"
                        : "hover:bg-[var(--muted-bg)] border border-transparent"
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isDone ? (
                        <CheckCircle2 size={16} className="text-[#1D9E75]" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isCurrent ? "border-[#185FA5]" : "border-[var(--border)]"}`}>
                          <span className="text-[9px] font-bold text-[var(--muted)]">{idx + 1}</span>
                        </div>
                      )}
                    </div>
                    <span className={`text-xs leading-snug ${isCurrent ? "text-[#185FA5] font-semibold" : isDone ? "text-[var(--muted)] line-through" : "text-[var(--foreground)]"}`}>
                      {lec.title}
                    </span>
                  </Link>
                );
              })}
            </div>

            {mod.labs.length > 0 && (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mt-5 mb-3 px-1 flex items-center gap-1.5">
                  <FlaskConical size={11} className="text-[#1D9E75]" />
                  Labs
                </p>
                <div className="space-y-0.5">
                  {mod.labs.map((lab, idx) => {
                    const isDone = mounted && completedLabs.includes(lab.id);
                    return (
                      <div
                        key={lab.id}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg border border-transparent"
                      >
                        <div className="shrink-0 mt-0.5">
                          {isDone ? (
                            <CheckCircle2 size={16} className="text-[#1D9E75]" />
                          ) : (
                            <Circle size={16} className="text-[var(--border)]" />
                          )}
                        </div>
                        <span className={`text-xs leading-snug ${isDone ? "text-[var(--muted)] line-through" : "text-[var(--muted)]"}`}>
                          Lab {idx + 1} — {lab.title.replace(/^Lab \d+ — /, '')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 max-w-3xl mx-auto lg:mx-0">
          {lecture ? (
            <>
              {/* Lecture header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <PlayCircle size={14} className="text-[#185FA5]" />
                  <span className="text-xs text-[var(--muted)] font-medium">
                    {currentIdx >= 0 ? `Lecture ${currentIdx + 1} of ${allLectures.length}` : "Lecture"}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] leading-snug">
                  {lecture.title}
                </h1>
                <p className="text-[var(--muted)] mt-2 text-sm">{lecture.description}</p>
              </div>

              {/* Lecture body */}
              <article className="md-content mb-12">
                {!content || content === 'Full content coming soon. Check back after Batch 4 starts June 1.' ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#185FA5]/10 flex items-center justify-center mb-4">
                      <PlayCircle size={28} className="text-[#185FA5]" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">Content Coming Soon</h3>
                    <p className="text-[var(--muted)] text-sm max-w-xs">
                      Full content coming soon. Check back after Batch 4 starts June 1.
                    </p>
                  </div>
                ) : (
                  <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {content}
                  </Markdown>
                )}
              </article>

              {/* Navigation footer */}
              <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-3">
                  {prevLecture ? (
                    <Link
                      href={`/modules/${mod.slug}/${prevLecture.id}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] hover:border-[#185FA5]/50 hover:bg-[#185FA5]/5 text-sm font-medium text-[var(--foreground)] transition-all"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>

                <button
                  onClick={handleMarkComplete}
                  disabled={!mounted}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    isCompleted
                      ? "bg-[#1D9E75]/15 text-[#1D9E75] border border-[#1D9E75]/30 hover:bg-[#1D9E75]/25"
                      : "bg-[#185FA5] text-white hover:bg-[#185FA5]/90"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 size={16} />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle size={16} />
                      Mark as Complete
                    </>
                  )}
                </button>

                {nextLecture ? (
                  <Link
                    href={`/modules/${mod.slug}/${nextLecture.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#185FA5] text-white hover:bg-[#185FA5]/90 text-sm font-medium transition-all"
                  >
                    Next Lecture
                    <ChevronRight size={16} />
                  </Link>
                ) : (
                  <Link
                    href={`/modules/${mod.slug}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#1D9E75]/30 bg-[#1D9E75]/10 text-[#1D9E75] hover:bg-[#1D9E75]/20 text-sm font-medium transition-all"
                  >
                    <Award size={16} />
                    Finish Module
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-[var(--muted)]">Lecture not found.</p>
              <Link href={`/modules/${mod.slug}`} className="text-[#185FA5] hover:underline text-sm mt-2 inline-block">
                Back to module
              </Link>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR — progress */}
        <aside className="hidden xl:flex flex-col w-64 shrink-0 border-l border-[var(--border)] min-h-[calc(100vh-53px)] sticky top-[53px] h-[calc(100vh-53px)] overflow-y-auto">
          <div className="p-5">
            <h3 className="font-bold text-[var(--foreground)] mb-4 text-sm">Module Progress</h3>

            {/* Big ring */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="var(--border)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="14" fill="none"
                    stroke={progressPct === 100 ? "#1D9E75" : "#185FA5"}
                    strokeWidth="3"
                    strokeDasharray={`${progressPct * 87.96 / 100} ${87.96}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-base font-extrabold text-[var(--foreground)]">
                  {mounted ? progressPct : 0}%
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-2">
                {mounted ? completedCount : 0} / {totalItems} completed
              </p>
            </div>

            {/* Progress bars */}
            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--muted)] flex items-center gap-1">
                    <PlayCircle size={11} className="text-[#185FA5]" />
                    Lectures
                  </span>
                  <span className="font-semibold text-[#185FA5]">
                    {mounted ? completedLectures.length : 0}/{allLectures.length}
                  </span>
                </div>
                <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#185FA5] rounded-full transition-all duration-500"
                    style={{ width: mounted && allLectures.length > 0 ? `${Math.round((completedLectures.length / allLectures.length) * 100)}%` : "0%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--muted)] flex items-center gap-1">
                    <FlaskConical size={11} className="text-[#1D9E75]" />
                    Labs
                  </span>
                  <span className="font-semibold text-[#1D9E75]">
                    {mounted ? completedLabs.length : 0}/{mod.labCount}
                  </span>
                </div>
                <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1D9E75] rounded-full transition-all duration-500"
                    style={{ width: mounted && mod.labCount > 0 ? `${Math.round((completedLabs.length / mod.labCount) * 100)}%` : "0%" }}
                  />
                </div>
              </div>
            </div>

            {progressPct === 100 && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#1D9E75]/10 border border-[#1D9E75]/25 text-[#1D9E75] text-xs font-semibold">
                <Award size={14} />
                Module Complete!
              </div>
            )}

            <p className="text-[10px] text-[var(--muted)] mt-3 text-center">
              Progress is saved in your browser.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
