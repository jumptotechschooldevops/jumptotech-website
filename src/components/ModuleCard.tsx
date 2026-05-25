"use client";

import Link from "next/link";
import { Module } from "@/lib/data";
import { BookOpen, FlaskConical, Clock } from "lucide-react";

interface ModuleCardProps {
  module: Module;
  progress: number;
}

export function ModuleCard({ module, progress }: ModuleCardProps) {
  return (
    <Link
      href={`/modules/${module.slug}`}
      className="group block rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card-bg)] card-hover"
    >
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={module.coverImage}
          alt={module.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `linear-gradient(to bottom, transparent 30%, ${module.color}dd)`,
          }}
        />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-white font-bold text-lg leading-tight drop-shadow">
            {module.title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
          {module.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <BookOpen size={12} />
            {module.lectureCount} lectures
          </span>
          <span className="flex items-center gap-1">
            <FlaskConical size={12} />
            {module.labCount} labs
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {module.totalHours}h
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-[var(--muted)]">Progress</span>
            <span
              className="font-semibold"
              style={{ color: progress > 0 ? "var(--success)" : "var(--muted)" }}
            >
              {progress}%
            </span>
          </div>
          <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                backgroundColor: progress === 100 ? "var(--success)" : "var(--primary)",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
