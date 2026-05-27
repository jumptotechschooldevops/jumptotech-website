"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export function FounderSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--card-bg)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                {t("Meet the Founder", "Познакомьтесь с основателем")}
              </h2>
              <div className="w-20 h-1 bg-[#185FA5] mt-4 rounded-full" />
            </div>

            <div className="space-y-4 text-[var(--muted)] leading-relaxed text-sm sm:text-base">
              <p>
                {t(
                  "Our founder has over a decade of experience in building and scaling infrastructure for enterprise companies. After seeing the gap between traditional education and what the industry actually needs, JumpToTech was born.",
                  "Наш основатель имеет более десяти лет опыта создания и масштабирования инфраструктуры для корпоративных компаний. Увидев разрыв между традиционным образованием и тем, что действительно нужно индустрии, был создан JumpToTech."
                )}
              </p>
              <p>
                {t(
                  "We believe in hands-on learning. You won't just watch videos here—you will build, break, and fix real infrastructure. Our goal is to make you production-ready from day one.",
                  "Мы верим в практическое обучение. Вы не просто будете смотреть видео здесь — вы будете создавать, ломать и чинить реальную инфраструктуру. Наша цель — подготовить вас к работе в production с первого дня."
                )}
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden border-4 border-[#185FA5]/20">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
                alt="Founder"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-bold text-lg">Alex Devops</p>
                <p className="text-white/80 text-sm">Founder & Lead Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
