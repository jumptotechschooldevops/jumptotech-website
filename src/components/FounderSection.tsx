"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export function FounderSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[var(--card-bg)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* TEXT SECTION */}
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
                  "Welcome to JumpToTech DevOps School! My name is Aisalkyn Aidarova — founder of JumpToTech, Senior DevOps Engineer, researcher, and PhD candidate.",
                  "Добро пожаловать в JumpToTech DevOps School! Меня зовут Айсалкын Айдарова — основатель JumpToTech, Senior DevOps Engineer, исследователь и кандидат PhD."
                )}
              </p>

              <p>
                {t(
                  "I earned my Associate Degree in Computer Science from Wilbur Wright College and completed both my Bachelor’s and Master’s degrees at Northeastern Illinois University (NEIU).",
                  "Я получила Associate Degree в области Computer Science в Wilbur Wright College, а также Bachelor’s и Master’s degree в Northeastern Illinois University (NEIU)."
                )}
              </p>

              <p>
                {t(
                  "My professional journey in IT started at MHC, where I worked as a QA Engineer and gained hands-on experience with enterprise systems, automation testing, CI/CD pipelines, cloud technologies, and production-level applications.",
                  "Мой профессиональный путь в IT начался в компании MHC, где я работала QA Engineer и получила практический опыт работы с enterprise-системами, automation testing, CI/CD pipeline, cloud технологиями и production-приложениями."
                )}
              </p>

              <p>
                {t(
                  "Through continuous learning and real-world experience, I transitioned into DevOps and Cloud Engineering, working with AWS, Kubernetes, Docker, Terraform, Linux, monitoring, automation, and cloud infrastructure technologies.",
                  "Благодаря постоянному обучению и практическому опыту я перешла в DevOps и Cloud Engineering, работая с AWS, Kubernetes, Docker, Terraform, Linux, monitoring, automation и cloud инфраструктурой."
                )}
              </p>

              <p>
                {t(
                  "JumpToTech was created to help students gain practical, job-ready skills using real projects, real tools, and production-style environments that prepare them for successful technology careers.",
                  "JumpToTech был создан, чтобы помогать студентам получать реальные, востребованные навыки с использованием настоящих проектов, инструментов и production-подобных environment."
                )}
              </p>

              <p>
                {t(
                  "Whether you are changing careers, starting from zero, or advancing your current IT skills, our mission is to help you confidently build a successful future in technology.",
                  "Независимо от того, меняете ли вы профессию, начинаете с нуля или развиваете свои IT-навыки, наша цель — помочь вам уверенно построить успешное будущее в сфере технологий."
                )}
              </p>

            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="order-1 md:order-2">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden border-4 border-[#185FA5]/20">

              <Image
                src="/founder.png"
                alt="Aisalkyn Aidarova"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-bold text-lg">
                  Aisalkyn Aidarova
                </p>

                <p className="text-white/80 text-sm">
                  Founder of JumpToTech DevOps School
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
