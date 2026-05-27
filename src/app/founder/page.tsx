"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function FounderPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
              {t("Meet the Founder", "Познакомьтесь с основателем")}
            </h1>
            <div className="w-20 h-1 bg-[#185FA5] mt-4 rounded-full" />
          </div>

          <div className="space-y-4 text-[var(--muted)] leading-relaxed text-base sm:text-lg">
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

        <div className="order-1 md:order-2">
          <div className="relative h-[650px] w-full rounded-2xl overflow-hidden border-4 border-[#185FA5]/20 shadow-xl">
            <Image
              src="/founder.png"
              alt="Aisalkyn Aidarova"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
              <p className="text-white font-bold text-2xl mb-1">Aisalkyn Aidarova</p>
              <p className="text-[#1D9E75] font-medium text-lg">Founder & Lead Instructor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
