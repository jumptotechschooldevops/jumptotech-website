"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { GiscusComments } from "@/components/GiscusComments";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DbModule, DbLecture, DbLab } from "@/types/supabase-modules";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  PlayCircle,
  FlaskConical,
  Clock,
  ChevronRight,
  ChevronDown,
  Award,
  ExternalLink,
} from "lucide-react";

const difficultyColors: Record<string, string> = {
  beginner: "bg-[#1D9E75]/15 text-[#1D9E75] border-[#1D9E75]/25",
  intermediate: "bg-[#185FA5]/15 text-[#185FA5] border-[#185FA5]/25",
  advanced: "bg-orange-500/15 text-orange-500 border-orange-500/25",
};

interface Props {
  initialModuleSlug: string;
}

export function ModulePageClient({ initialModuleSlug }: Props) {
  const [mod, setMod] = useState<DbModule | null>(null);
  const [lectures, setLectures] = useState<DbLecture[]>([]);
  const [labs, setLabs] = useState<DbLab[]>([]);
  const [loading, setLoading] = useState(true);

  const { mounted, completedLectures, completedLabs, toggleLecture, toggleLab } = useProgress(mod ? mod.id : "");
  const { role } = useAuth();

  const [expandedLectures, setExpandedLectures] = useState<Set<string>>(new Set());
  const [sidebarLecturesOpen, setSidebarLecturesOpen] = useState(true);
  const [sidebarLabsOpen, setSidebarLabsOpen] = useState(false);

  useEffect(() => {
    const fetchModuleData = async () => {
      // Fetch module
      const { data: modData, error: modError } = await supabase
        .from('modules')
        .select('*')
        .eq('slug', initialModuleSlug)
        .eq('published', true)
        .single();

      if (modError || !modData) {
        setLoading(false);
        return;
      }

      setMod(modData);

      // Fetch lectures
      const { data: lecData } = await supabase
        .from('lectures')
        .select('*')
        .eq('module_id', modData.id)
        .eq('published', true)
        .order('order_index', { ascending: true });

      if (lecData) setLectures(lecData);

      // Fetch labs
      const { data: labData } = await supabase
        .from('labs')
        .select('*')
        .eq('module_id', modData.id)
        .eq('published', true)
        .order('order_index', { ascending: true });

      if (labData) setLabs(labData);

      setLoading(false);
    };

    fetchModuleData();
  }, [initialModuleSlug]);

  if (loading) return <div className="p-12 text-center text-[var(--muted)]">Loading module...</div>;
  if (!mod) return <div className="p-12 text-center text-[var(--muted)]">Module not found.</div>;

  const displayLectureCount = lectures.length;
  const labCount = labs.length;
  const totalItems = displayLectureCount + labCount;
  const completedCount = completedLectures.length + completedLabs.length;
  const progressPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  const isComplete = progressPct === 100;

  const toggleExpanded = (id: string) => {
    setExpandedLectures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-[var(--background)]">
      {/* Hero cover */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        {mod.cover_image && (
          <img
            src={mod.cover_image}
            alt={mod.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${mod.color || '#000'}99 0%, ${mod.color || '#000'}ee 60%, ${mod.color || '#000'} 100%)`,
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <Link
              href="/modules"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={15} />
              All Modules
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{mod.title}</h1>
            <p className="text-white/85 max-w-2xl text-sm sm:text-base leading-relaxed">{mod.description}</p>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div className="bg-[var(--card-bg)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
              <span className="flex items-center gap-1.5">
                <PlayCircle size={15} className="text-[#185FA5]" />
                {displayLectureCount} lectures
              </span>
              <span className="flex items-center gap-1.5">
                <FlaskConical size={15} className="text-[#1D9E75]" />
                {labCount} labs
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-purple-500" />
                {mod.total_hours}h total
              </span>
            </div>

            {/* Progress ring */}
            {mounted && (
              <div className="flex items-center gap-3">
                {isComplete && (
                  <div className="flex items-center gap-1.5 text-[#1D9E75] text-sm font-semibold">
                    <Award size={16} />
                    Module Complete!
                  </div>
                )}
                <div className="text-right">
                  <div className="text-sm font-bold text-[var(--foreground)]">{progressPct}%</div>
                  <div className="text-xs text-[var(--muted)]">{completedCount}/{totalItems} done</div>
                </div>
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" strokeWidth="2.5" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke={isComplete ? "#1D9E75" : "#185FA5"}
                      strokeWidth="2.5"
                      strokeDasharray={`${progressPct} ${100 - progressPct}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[var(--foreground)]">
                    {progressPct}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: mounted ? `${progressPct}%` : "0%",
                backgroundColor: isComplete ? "#1D9E75" : "#185FA5",
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* LECTURES */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <PlayCircle size={20} className="text-[#185FA5]" />
                <h2 className="text-xl font-bold text-[var(--foreground)]">Lectures</h2>
                <span className="px-2 py-0.5 rounded-md bg-[var(--muted-bg)] text-xs font-medium text-[var(--muted)]">
                  {displayLectureCount}
                </span>
              </div>

              <div className="space-y-2">
                {lectures.map((lecture, idx) => {
                  const isCompleted = mounted && completedLectures.includes(lecture.id);
                  const isExpanded = expandedLectures.has(lecture.id);
                  return (
                    <div
                      key={lecture.id}
                      className={`rounded-xl border transition-all ${
                        isCompleted
                          ? "border-[#1D9E75]/30 bg-[#1D9E75]/5"
                          : "border-[var(--border)] bg-[var(--card-bg)]"
                      }`}
                    >
                      <div
                        className={`flex items-start gap-3 p-4 rounded-xl transition-colors ${role !== "visitor" ? "cursor-pointer hover:bg-[#185FA5]/5" : "opacity-80"}`}
                        onClick={() => role !== "visitor" ? toggleExpanded(lecture.id) : null}
                      >
                        {/* Number / check — click only toggles completion */}
                        <div
                          className="flex-shrink-0 mt-0.5"
                          onClick={(e) => { e.stopPropagation(); mounted && toggleLecture(lecture.id); }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={20} className="text-[#1D9E75]" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-[var(--border)] flex items-center justify-center hover:border-[#185FA5] transition-colors">
                              <span className="text-[10px] text-[var(--muted)] font-bold">{idx + 1}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-sm font-semibold leading-snug ${
                                isCompleted
                                  ? "line-through text-[var(--muted)]"
                                  : "text-[var(--foreground)]"
                              }`}
                            >
                              {lecture.title}
                            </p>
                            <div className="flex items-center gap-2 shrink-0">
                              {role === "visitor" ? (
                                <span className="text-xs text-[var(--muted)] font-medium">Locked</span>
                              ) : (
                                <ChevronDown
                                  size={14}
                                  className={`text-[var(--muted)] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                                />
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{lecture.description}</p>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 ml-8">
                          <Link
                            href={`/modules/${mod.slug}/${lecture.id}`}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#185FA5] hover:underline"
                          >
                            Read full lecture
                            <ExternalLink size={9} />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LABS */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <FlaskConical size={20} className="text-[#1D9E75]" />
                <h2 className="text-xl font-bold text-[var(--foreground)]">Hands-on Labs</h2>
                <span className="px-2 py-0.5 rounded-md bg-[var(--muted-bg)] text-xs font-medium text-[var(--muted)]">
                  {labCount}
                </span>
              </div>

              <div className="space-y-3">
                {labs.map((lab, idx) => {
                  const isCompleted = mounted && completedLabs.includes(lab.id);
                  return (
                    <div
                      key={lab.id}
                      className={`group flex items-start gap-3 p-4 rounded-xl border transition-all ${role !== "visitor" ? "cursor-pointer" : "opacity-80"} ${
                        isCompleted
                          ? "border-[#1D9E75]/30 bg-[#1D9E75]/5"
                          : `border-[var(--border)] bg-[var(--card-bg)] ${role !== "visitor" ? "hover:border-[#1D9E75]/40 hover:bg-[#1D9E75]/5" : ""}`
                      }`}
                      onClick={() => role !== "visitor" && mounted && toggleLab(lab.id)}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={20} className="text-[#1D9E75] shrink-0 mt-0.5" />
                      ) : (
                        <Circle size={20} className="text-[var(--border)] shrink-0 mt-0.5" />
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p
                            className={`text-sm font-semibold leading-snug ${
                              isCompleted ? "line-through text-[var(--muted)]" : "text-[var(--foreground)]"
                            }`}
                          >
                            Lab {idx + 1} — {lab.title}
                          </p>
                          <div className="flex gap-2 items-center">
                            {role === "visitor" && (
                              <span className="text-xs text-[var(--muted)] font-medium">Locked</span>
                            )}
                            {lab.difficulty && (
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border shrink-0 ${difficultyColors[lab.difficulty] || difficultyColors.beginner}`}
                              >
                                {lab.difficulty}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-[var(--muted)] leading-relaxed">{lab.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* GISCUS COMMENTS */}
            <GiscusComments term={`module-${mod.slug}`} />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Progress card */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sticky top-20">
              <h3 className="font-bold text-[var(--foreground)] mb-4">Your Progress</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[var(--muted)]">Lectures</span>
                    <span className="font-semibold text-[#185FA5]">
                      {mounted ? completedLectures.length : 0}/{displayLectureCount}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#185FA5] rounded-full transition-all duration-500"
                      style={{
                        width: mounted && displayLectureCount > 0
                          ? `${Math.round((completedLectures.length / displayLectureCount) * 100)}%`
                          : "0%",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[var(--muted)]">Labs</span>
                    <span className="font-semibold text-[#1D9E75]">
                      {mounted ? completedLabs.length : 0}/{labCount}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1D9E75] rounded-full transition-all duration-500"
                      style={{
                        width: mounted && labCount > 0
                          ? `${Math.round((completedLabs.length / labCount) * 100)}%`
                          : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--muted-bg)] mb-4">
                <span className="text-sm font-medium text-[var(--foreground)]">Overall</span>
                <span
                  className="text-lg font-extrabold"
                  style={{ color: isComplete ? "#1D9E75" : "#185FA5" }}
                >
                  {mounted ? progressPct : 0}%
                </span>
              </div>

              {isComplete && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#1D9E75]/10 border border-[#1D9E75]/25 text-[#1D9E75] text-sm font-semibold">
                  <Award size={16} />
                  Module Complete! 🎉
                </div>
              )}

              <p className="text-[10px] text-[var(--muted)] mt-3 text-center">
                Progress is saved locally in your browser.
              </p>
            </div>

            {/* Contents navigation */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Contents</h3>

              {/* Lectures section */}
              <div className="mb-1">
                <button
                  className="flex items-center justify-between w-full py-2 text-sm font-semibold text-[var(--foreground)] hover:text-[#185FA5] transition-colors"
                  onClick={() => setSidebarLecturesOpen(!sidebarLecturesOpen)}
                >
                  <span className="flex items-center gap-2">
                    <PlayCircle size={13} className="text-[#185FA5]" />
                    Lectures
                    <span className="text-xs text-[var(--muted)] font-normal">({displayLectureCount})</span>
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${sidebarLecturesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {sidebarLecturesOpen && (
                  <div className="mt-1 space-y-0.5 pl-1">
                    {lectures.map((lecture, idx) => (
                      <div key={lecture.id} className="flex items-start gap-1.5 py-0.5">
                        <span className="text-[10px] text-[var(--muted)] w-5 text-right shrink-0 pt-px">{idx + 1}.</span>
                        <span className="text-xs text-[var(--muted)] leading-tight">{lecture.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-px bg-[var(--border)] my-2" />

              {/* Labs section */}
              <div>
                <button
                  className="flex items-center justify-between w-full py-2 text-sm font-semibold text-[var(--foreground)] hover:text-[#1D9E75] transition-colors"
                  onClick={() => setSidebarLabsOpen(!sidebarLabsOpen)}
                >
                  <span className="flex items-center gap-2">
                    <FlaskConical size={13} className="text-[#1D9E75]" />
                    Labs
                    <span className="text-xs text-[var(--muted)] font-normal">({labCount})</span>
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${sidebarLabsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {sidebarLabsOpen && (
                  <div className="mt-1 space-y-0.5 pl-1">
                    {labs.map((lab, idx) => (
                      <div key={lab.id} className="flex items-start gap-1.5 py-0.5">
                        <span className="text-[10px] text-[var(--muted)] w-5 text-right shrink-0 pt-px">{idx + 1}.</span>
                        <span className="text-xs text-[var(--muted)] leading-tight">{lab.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Module info */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
              <h3 className="font-bold text-[var(--foreground)] mb-4">Module Info</h3>
              <div className="space-y-3">
                {[
                  { icon: PlayCircle, label: "Lectures", value: displayLectureCount, color: "#185FA5" },
                  { icon: FlaskConical, label: "Labs", value: labCount, color: "#1D9E75" },
                  { icon: Clock, label: "Total time", value: `${mod.total_hours} hours`, color: "#7c3aed" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <Icon size={14} style={{ color }} />
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-[var(--foreground)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
