"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useAppState } from "@/contexts/AppStateContext";
import Link from "next/link";
import Image from "next/image";

export default function LabsPage() {
  const { t } = useLanguage();
  const { modulesData } = useAppState();

  const allLabs = modulesData.flatMap(mod =>
    mod.lectures.filter(l => l.type === 'lab').map(lecture => ({ module: mod, lecture }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 min-h-screen">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8">
        {t("All Labs", "Все лабораторные работы")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {allLabs.map(({ module: mod, lecture }) => (
          <Link
            key={`${mod.id}-${lecture.id}`}
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
                <span className="px-2 py-0.5 rounded-md text-xs font-semibold text-white bg-[#1D9E75]">
                  {lecture.type}
                </span>
              </div>
            </div>
            <div className="p-3 space-y-1">
              <p className="text-sm font-semibold text-[var(--foreground)] line-clamp-2 group-hover:text-[#1D9E75] transition-colors">
                {lecture.title}
              </p>
              <p className="text-xs text-[var(--muted)]">{lecture.duration}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
