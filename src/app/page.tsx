"use client";

import { announcements, discussions, stats } from "@/lib/data";
import { RegistrationForm } from "@/components/RegistrationForm";
import { CommunityPhotos } from "@/components/CommunityPhotos";
import { SuccessStories } from "@/components/SuccessStories";
import { FAQ } from "@/components/FAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import {
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
  Phone,
  Calendar,
  Clock,
  DollarSign,
} from "lucide-react";
import { FounderSection } from "@/components/FounderSection";
import { DevOpsQuiz } from "@/components/DevOpsQuiz";

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

export default function HomePage() {
  const { lang, t } = useLanguage();

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
              {t("🎓 Batch 4 · June 1, 2026 · Limited spots", "🎓 Набор 4 · 1 июня 2026 · Ограниченные места")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
              {lang === "ru" ? (
                <>Стань DevOps-инженером{" "}<span className="block text-white/75">за 7 месяцев</span></>
              ) : (
                <>Become a DevOps{" "}<span className="block text-white/75">Engineer in 7 Months</span></>
              )}
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-6 max-w-2xl">
              {t(
                "Hands-on training, real projects, job-ready skills. Join 3 batches of successful graduates.",
                "Практическое обучение, реальные проекты, навыки для работы. Присоединяйся к 3 выпускам успешных студентов."
              )}
            </p>

            {/* Price + schedule cards */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-white text-sm">
                <DollarSign size={15} className="text-yellow-300 shrink-0" />
                <span>
                  <strong className="text-yellow-300">$700/mo</strong>
                  {" "}
                  <span className="text-white/70 text-xs">{t("or $5,000 total", "или $5,000 всего")}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-white text-sm">
                <Calendar size={15} className="text-white/70 shrink-0" />
                <span>{t("Mon–Fri · starts June 1", "Пн–Пт · с 1 июня")}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-white text-sm">
                <Clock size={15} className="text-white/70 shrink-0" />
                <span>{t("6PM–9PM CST", "18:00–21:00 CST")}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#185FA5] font-bold hover:bg-white/90 transition-colors"
              >
                <Rocket size={18} />
                {t("Register Now →", "Записаться →")}
              </a>
              <a
                href="tel:8728065906"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 text-white font-semibold border border-white/25 hover:bg-white/25 transition-colors"
              >
                <Phone size={16} />
                {t("Call Us: 872-806-5906", "Позвонить: 872-806-5906")}
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
                <strong className="text-white">
                  {t("3 batches completed", "3 завершённых группы")}
                </strong>
                {" · "}
                {t("50+ graduates", "50+ выпускников")}
                <span className="flex items-center gap-1 text-yellow-300 font-medium mt-0.5">
                  <Star size={13} fill="currentColor" />
                  {t("4.9 average rating", "рейтинг 4.9")}
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
              { icon: Users, value: stats.students.toLocaleString(), label: t("Students", "Студентов") },
              { icon: BookOpen, value: stats.modules, label: t("Modules", "Модулей") },
              { icon: PlayCircle, value: stats.lectures, label: t("Lectures", "Лекций") },
              { icon: FlaskConical, value: stats.labs, label: t("Labs", "Лабораторных") },
              { icon: TrendingUp, value: `${stats.completionRate}%`, label: t("Completion", "Завершение") },
              { icon: Star, value: stats.satisfaction, label: t("Rating", "Рейтинг") },
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

      {/* FOUNDER SECTION */}
      <FounderSection />


      {/* DEVOPS QUIZ */}
      <DevOpsQuiz />
        

      {/* REGISTRATION FORM */}
      <RegistrationForm />

      {/* COMMUNITY PHOTOS */}
      <CommunityPhotos />

      {/* SUCCESS STORIES */}
      <SuccessStories />

      {/* ANNOUNCEMENTS + DISCUSSIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Announcements */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Bell size={20} className="text-[#185FA5]" />
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                {t("Announcements", "Объявления")}
              </h2>
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
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                {t("Student Discussions", "Обсуждения студентов")}
              </h2>
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
                          {new Date(disc.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
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

      {/* FAQ */}
      <FAQ />

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
              {t(
                "Ready to launch your DevOps career?",
                "Готовы начать карьеру в DevOps?"
              )}
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              {t(
                "Batch 4 starts June 1, 2026. Only a few spots left. $700/month payment plan available.",
                "Набор 4 начинается 1 июня 2026. Осталось несколько мест. Оплата от $700/месяц."
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#185FA5] font-bold hover:bg-white/90 transition-colors"
              >
                <Rocket size={18} />
                {t("Register Now", "Записаться")}
              </a>
              <a
                href="tel:8728065906"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/15 text-white font-semibold border border-white/25 hover:bg-white/25 transition-colors"
              >
                <Phone size={16} />
                872-806-5906
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
