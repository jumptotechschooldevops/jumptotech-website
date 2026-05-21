"use client";

import Link from "next/link";
import Image from "next/image";
import { modules, announcements, discussions, stats } from "@/lib/data";
import { useAllProgress } from "@/hooks/useProgress";
import { ModuleCard } from "@/components/ModuleCard";
import {
  ArrowRight,
  Users,
  BookOpen,
  FlaskConical,
  Star,
  Trophy,
  Bell,
  MessageSquare,
  ThumbsUp,
  PlayCircle,
  Rocket,
  TrendingUp,
} from "lucide-react";

const tagStyles: Record<string, string> = {
  new: "bg-[#1D9E75]/15 text-[#1D9E75] border-[#1D9E75]/25",
  update: "bg-blue-500/15 text-blue-500 border-blue-500/25",
  event: "bg-purple-500/15 text-purple-500 border-purple-500/25",
  deadline: "bg-red-500/15 text-red-500 border-red-500/25",
};

const tagLabels: Record<string, string> = {
  new: "NEW",
  update: "UPDATE",
  event: "EVENT",
  deadline: "DEADLINE",
};

const latestLectures = [
  { module: modules[4], lecture: modules[4].lectures[12] },
  { module: modules[3], lecture: modules[3].lectures[5] },
  { module: modules[6], lecture: modules[6].lectures[6] },
  { module: modules[7], lecture: modules[7].lectures[6] },
];

export default function HomePage() {
  const { getModulePercent, mounted } = useAllProgress();

  return (
    <div className="bg-[var(--background)]">
      {/* HERO */}
      <section className="relative overflow-hidden hero-gradient">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] pulse-dot" />
              New module just launched: Prometheus &amp; Grafana
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Master DevOps{" "}
              <span className="block text-white/70">from the ground up.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              Hands-on courses covering Git, Linux, Docker, Kubernetes, Terraform, CI/CD, AWS, and more. Learn by doing with real-world labs and projects used in top tech companies.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/modules"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#185FA5] font-semibold hover:bg-white/90 transition-colors"
              >
                <Rocket size={18} />
                Start Learning Free
              </Link>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 text-white font-semibold border border-white/25 hover:bg-white/25 transition-colors"
              >
                Browse Modules
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["AS", "DB", "NA", "ZO", "MK"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: `hsl(${i * 60 + 200}, 60%, 45%)` }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-white/80 text-sm">
                <strong className="text-white">1,847 students</strong> already enrolled
                <span className="flex items-center gap-1 text-yellow-300 font-medium">
                  <Star size={13} fill="currentColor" />
                  4.9 average rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { icon: Users, value: stats.students.toLocaleString(), label: "Students" },
              { icon: BookOpen, value: stats.modules, label: "Modules" },
              { icon: PlayCircle, value: stats.lectures, label: "Lectures" },
              { icon: FlaskConical, value: stats.labs, label: "Labs" },
              { icon: TrendingUp, value: `${stats.completionRate}%`, label: "Completion" },
              { icon: Star, value: stats.satisfaction, label: "Rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1">
                <Icon size={20} className="text-[#185FA5] mb-1" />
                <span className="text-2xl font-extrabold text-[var(--foreground)]">{value}</span>
                <span className="text-xs text-[var(--muted)]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE GRID */}
      <section id="modules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">All Modules</h2>
            <p className="text-[var(--muted)] mt-1">
              {stats.modules} modules • {stats.lectures} lectures • {stats.labs} hands-on labs
            </p>
          </div>
          <Link
            href="/modules"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#185FA5] hover:underline"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              progress={mounted ? getModulePercent(mod.id, mod.lectureCount, mod.labCount) : 0}
            />
          ))}
        </div>
      </section>

      {/* LATEST LECTURES */}
      <section className="bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">Latest Lectures</h2>
              <p className="text-[var(--muted)] mt-1">Recently added &amp; updated content</p>
            </div>
            <Link
              href="/modules"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#185FA5] hover:underline"
            >
              Browse all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestLectures.map(({ module: mod, lecture }) => (
              <Link
                key={lecture.id}
                href={`/modules/${mod.slug}`}
                className="group rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--background)] card-hover"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={mod.coverImage}
                    alt={mod.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <span
                      className="px-2 py-0.5 rounded-md text-xs font-semibold text-white"
                      style={{ backgroundColor: mod.color }}
                    >
                      {mod.title}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs font-semibold text-white ${
                        lecture.type === "video"
                          ? "bg-[#185FA5]"
                          : lecture.type === "lab"
                          ? "bg-[#1D9E75]"
                          : "bg-gray-600"
                      }`}
                    >
                      {lecture.type}
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-sm font-semibold text-[var(--foreground)] line-clamp-2 group-hover:text-[#185FA5] transition-colors">
                    {lecture.title}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{lecture.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENTS + DISCUSSIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Announcements */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Bell size={20} className="text-[#185FA5]" />
              <h2 className="text-xl font-bold text-[var(--foreground)]">Announcements</h2>
            </div>
            <div className="space-y-4">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] card-hover cursor-default"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                      {ann.title}
                    </h3>
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide border ${tagStyles[ann.tag]}`}
                    >
                      {tagLabels[ann.tag]}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mb-2">{ann.body}</p>
                  <p className="text-[10px] text-[var(--muted)]">
                    {new Date(ann.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Discussions */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={20} className="text-[#1D9E75]" />
              <h2 className="text-xl font-bold text-[var(--foreground)]">Student Discussions</h2>
            </div>
            <div className="space-y-4">
              {discussions.map((disc) => (
                <div
                  key={disc.id}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] card-hover cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: `hsl(${disc.id.charCodeAt(6) * 37 + 180}, 60%, 45%)` }}
                    >
                      {disc.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-semibold text-[var(--foreground)]">{disc.author}</span>
                        <span className="text-[10px] text-[var(--muted)] shrink-0">
                          {new Date(disc.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-[#185FA5]/10 text-[#185FA5] text-[10px] font-medium mb-1.5">
                        {disc.module}
                      </span>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">{disc.text}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-[var(--muted)]">
                        <ThumbsUp size={11} />
                        <span>{disc.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl hero-gradient p-8 sm:p-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative">
            <Trophy size={40} className="text-yellow-300 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to level up your DevOps career?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Join 1,847 students learning production-grade DevOps skills. Start with any module — it&apos;s completely free.
            </p>
            <Link
              href="/modules"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#185FA5] font-bold hover:bg-white/90 transition-colors"
            >
              <Rocket size={18} />
              Start Learning Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
