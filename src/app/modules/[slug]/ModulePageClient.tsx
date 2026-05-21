"use client";

import Image from "next/image";
import Link from "next/link";
import { Module } from "@/lib/data";
import { useProgress } from "@/hooks/useProgress";
import { GiscusComments } from "@/components/GiscusComments";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  PlayCircle,
  BookOpen,
  FlaskConical,
  Clock,
  ChevronRight,
  Award,
} from "lucide-react";

const difficultyColors = {
  beginner: "bg-[#1D9E75]/15 text-[#1D9E75] border-[#1D9E75]/25",
  intermediate: "bg-[#185FA5]/15 text-[#185FA5] border-[#185FA5]/25",
  advanced: "bg-orange-500/15 text-orange-500 border-orange-500/25",
};

const typeIcons = {
  video: PlayCircle,
  reading: BookOpen,
  lab: FlaskConical,
};

interface Props {
  module: Module;
}

export function ModulePageClient({ module: mod }: Props) {
  const { mounted, completedLectures, completedLabs, toggleLecture, toggleLab } = useProgress(mod.id);

  const totalItems = mod.lectureCount + mod.labCount;
  const completedCount = completedLectures.length + completedLabs.length;
  const progressPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
  const isComplete = progressPct === 100;

  return (
    <div className="bg-[var(--background)]">
      {/* Hero cover */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src={mod.coverImage}
          alt={mod.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${mod.color}99 0%, ${mod.color}ee 60%, ${mod.color} 100%)`,
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
                {mod.lectureCount} lectures
              </span>
              <span className="flex items-center gap-1.5">
                <FlaskConical size={15} className="text-[#1D9E75]" />
                {mod.labCount} labs
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-purple-500" />
                {mod.totalHours}h total
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
                  {mod.lectureCount}
                </span>
              </div>

              <div className="space-y-2">
                {mod.lectures.map((lecture, idx) => {
                  const isCompleted = mounted && completedLectures.includes(lecture.id);
                  const TypeIcon = typeIcons[lecture.type];
                  return (
                    <div
                      key={lecture.id}
                      className={`group flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                        isCompleted
                          ? "border-[#1D9E75]/30 bg-[#1D9E75]/5"
                          : "border-[var(--border)] bg-[var(--card-bg)] hover:border-[#185FA5]/40 hover:bg-[#185FA5]/5"
                      }`}
                      onClick={() => mounted && toggleLecture(lecture.id)}
                    >
                      {/* Number / check */}
                      <div className="flex-shrink-0 mt-0.5">
                        {isCompleted ? (
                          <CheckCircle2 size={20} className="text-[#1D9E75]" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[var(--border)] flex items-center justify-center">
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
                            <span
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                                lecture.type === "video"
                                  ? "bg-[#185FA5]/15 text-[#185FA5]"
                                  : lecture.type === "lab"
                                  ? "bg-[#1D9E75]/15 text-[#1D9E75]"
                                  : "bg-[var(--muted-bg)] text-[var(--muted)]"
                              }`}
                            >
                              <TypeIcon size={10} />
                              {lecture.type}
                            </span>
                            <span className="text-xs text-[var(--muted)] flex items-center gap-0.5">
                              <Clock size={11} />
                              {lecture.duration}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{lecture.description}</p>
                      </div>

                      <ChevronRight
                        size={14}
                        className="shrink-0 text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                      />
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
                  {mod.labCount}
                </span>
              </div>

              <div className="space-y-3">
                {mod.labs.map((lab, idx) => {
                  const isCompleted = mounted && completedLabs.includes(lab.id);
                  return (
                    <div
                      key={lab.id}
                      className={`group flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                        isCompleted
                          ? "border-[#1D9E75]/30 bg-[#1D9E75]/5"
                          : "border-[var(--border)] bg-[var(--card-bg)] hover:border-[#1D9E75]/40 hover:bg-[#1D9E75]/5"
                      }`}
                      onClick={() => mounted && toggleLab(lab.id)}
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
                            Lab {idx + 1}: {lab.title}
                          </p>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${difficultyColors[lab.difficulty]}`}
                            >
                              {lab.difficulty}
                            </span>
                            <span className="text-xs text-[var(--muted)] flex items-center gap-0.5">
                              <Clock size={11} />
                              {lab.duration}
                            </span>
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
                {/* Lectures progress */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[var(--muted)]">Lectures</span>
                    <span className="font-semibold text-[#185FA5]">
                      {mounted ? completedLectures.length : 0}/{mod.lectureCount}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#185FA5] rounded-full transition-all duration-500"
                      style={{
                        width: mounted
                          ? `${Math.round((completedLectures.length / mod.lectureCount) * 100)}%`
                          : "0%",
                      }}
                    />
                  </div>
                </div>
                {/* Labs progress */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[var(--muted)]">Labs</span>
                    <span className="font-semibold text-[#1D9E75]">
                      {mounted ? completedLabs.length : 0}/{mod.labCount}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1D9E75] rounded-full transition-all duration-500"
                      style={{
                        width: mounted
                          ? `${Math.round((completedLabs.length / mod.labCount) * 100)}%`
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

            {/* Module info */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
              <h3 className="font-bold text-[var(--foreground)] mb-4">Module Info</h3>
              <div className="space-y-3">
                {[
                  { icon: PlayCircle, label: "Lectures", value: mod.lectureCount, color: "#185FA5" },
                  { icon: FlaskConical, label: "Labs", value: mod.labCount, color: "#1D9E75" },
                  { icon: Clock, label: "Total time", value: `${mod.totalHours} hours`, color: "#7c3aed" },
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

            {/* Navigation */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Other Modules</h3>
              <div className="space-y-1.5">
                {[
                  { slug: "git", title: "Git & Version Control" },
                  { slug: "linux", title: "Linux Fundamentals" },
                  { slug: "docker", title: "Docker & Containers" },
                  { slug: "kubernetes", title: "Kubernetes" },
                  { slug: "terraform", title: "Terraform & IaC" },
                ].filter((m) => m.slug !== mod.slug).map((m) => (
                  <Link
                    key={m.slug}
                    href={`/modules/${m.slug}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--muted-bg)] transition-colors group"
                  >
                    <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                      {m.title}
                    </span>
                    <ChevronRight size={13} className="text-[var(--muted)] group-hover:text-[#185FA5] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
