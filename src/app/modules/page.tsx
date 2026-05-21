"use client";

import { modules } from "@/lib/data";
import { ModuleCard } from "@/components/ModuleCard";
import { useAllProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, FlaskConical, Clock, Lock } from "lucide-react";
import Link from "next/link";

export default function ModulesPage() {
  const { getModulePercent, mounted } = useAllProgress();
  const { loggedIn, mounted: authMounted } = useAuth();

  const totalLectures = modules.reduce((s, m) => s + m.lectureCount, 0);
  const totalLabs = modules.reduce((s, m) => s + m.labCount, 0);
  const totalHours = modules.reduce((s, m) => s + m.totalHours, 0);

  return (
    <div className="bg-[var(--background)]">
      {/* Auth prompt banner */}
      {authMounted && !loggedIn && (
        <div className="bg-[#185FA5]/8 border-b border-[#185FA5]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
              <Lock size={15} className="text-[#185FA5] shrink-0" />
              <span>
                <strong>You&apos;re previewing course content.</strong>
                {" "}Sign in to track your progress and unlock all features.
              </span>
            </div>
            <Link
              href="/login"
              className="shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#185FA5] text-white text-sm font-medium hover:bg-[#0f4a8a] transition-colors"
            >
              <Lock size={13} />
              Sign In
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-[var(--card-bg)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-3">
            All Modules
          </h1>
          <p className="text-[var(--muted)] text-lg mb-6 max-w-2xl">
            Everything you need to go from beginner to production-ready DevOps engineer. Pick any module and start learning.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#185FA5]" />
              <strong className="text-[var(--foreground)]">{totalLectures}</strong> lectures
            </span>
            <span className="flex items-center gap-2">
              <FlaskConical size={16} className="text-[#1D9E75]" />
              <strong className="text-[var(--foreground)]">{totalLabs}</strong> labs
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-purple-500" />
              <strong className="text-[var(--foreground)]">{totalHours}+</strong> hours of content
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              progress={mounted ? getModulePercent(mod.id, mod.lectureCount, mod.labCount) : 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
