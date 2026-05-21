"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";

const stories = [
  {
    initials: "AM",
    nameEn: "Alex M.",
    nameRu: "Алекс М.",
    batchEn: "Batch 2 Graduate",
    batchRu: "Выпускник группы 2",
    quoteEn: "Got hired as a DevOps Engineer at $95k. The hands-on labs made all the difference — I came in with zero experience.",
    quoteRu: "Устроился DevOps-инженером на $95k. Практические лабораторные работы стали ключевым фактором — я пришёл без опыта.",
    roleEn: "DevOps Engineer",
    roleRu: "DevOps-инженер",
    color: "hsl(220, 70%, 50%)",
  },
  {
    initials: "DK",
    nameEn: "Diana K.",
    nameRu: "Диана К.",
    batchEn: "Batch 1 Graduate",
    batchRu: "Выпускница группы 1",
    quoteEn: "I transitioned from customer service to cloud engineer in just 7 months. This program changed my life completely.",
    quoteRu: "Я перешла из клиентского сервиса в облачные инженеры за 7 месяцев. Эта программа изменила мою жизнь.",
    roleEn: "Cloud Engineer",
    roleRu: "Облачный инженер",
    color: "hsl(150, 60%, 40%)",
  },
  {
    initials: "NB",
    nameEn: "Nurlan B.",
    nameRu: "Нурлан Б.",
    batchEn: "Batch 3 Graduate",
    batchRu: "Выпускник группы 3",
    quoteEn: "Now working remotely as an SRE engineer. The Kubernetes and monitoring modules were incredibly detailed.",
    quoteRu: "Теперь работаю удалённо SRE-инженером. Модули по Kubernetes и мониторингу были невероятно подробными.",
    roleEn: "SRE Engineer",
    roleRu: "SRE-инженер",
    color: "hsl(270, 60%, 50%)",
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#FBBF24" className="text-yellow-400" />
      ))}
    </div>
  );
}

export function SuccessStories() {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--card-bg)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">
            {t("Student Success Stories", "Истории успеха студентов")}
          </h2>
          <p className="text-[var(--muted)]">
            {t(
              "Real results from real graduates across 3 batches.",
              "Реальные результаты выпускников трёх групп."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <div
              key={i}
              className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: s.color }}
                >
                  {s.initials}
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)] text-sm">
                    {t(s.nameEn, s.nameRu)}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{t(s.roleEn, s.roleRu)}</p>
                </div>
              </div>

              <StarRating />

              <blockquote className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                &ldquo;{t(s.quoteEn, s.quoteRu)}&rdquo;
              </blockquote>

              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#185FA5]/10 text-[#185FA5] text-xs font-medium">
                  {t(s.batchEn, s.batchRu)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
