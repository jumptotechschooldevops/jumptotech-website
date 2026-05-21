"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    qEn: "What experience do I need?",
    aEn: "No prior experience is required. We start from the very basics — how computers and networks work — and progress to production-grade DevOps tools. If you've used a computer, you can join.",
    qRu: "Какой опыт нужен?",
    aRu: "Опыт не требуется. Мы начинаем с самых основ — как работают компьютеры и сети — и постепенно переходим к профессиональным инструментам DevOps. Если вы умеете пользоваться компьютером — вы можете присоединиться.",
  },
  {
    qEn: "How are classes held?",
    aEn: "All classes are held live online via Zoom, Monday–Friday from 6PM to 9PM CST. You get real-time access to your instructor and classmates, with interactive Q&A every session.",
    qRu: "Как проходят занятия?",
    aRu: "Все занятия проходят вживую онлайн через Zoom, с понедельника по пятницу с 18:00 до 21:00 по CST. У вас будет прямой доступ к преподавателю и возможность задавать вопросы на каждом занятии.",
  },
  {
    qEn: "What if I miss a class?",
    aEn: "Every session is recorded and uploaded within 24 hours. You can watch replays at your convenience, and our instructors are available via chat to help you catch up.",
    qRu: "Что если я пропущу занятие?",
    aRu: "Каждое занятие записывается и публикуется в течение 24 часов. Вы можете посмотреть запись в удобное время, а наши преподаватели доступны в чате, чтобы помочь вам наверстать.",
  },
  {
    qEn: "Do you help with job placement?",
    aEn: "Yes. We offer resume reviews, LinkedIn profile optimization, mock technical interviews, and connect you with our network of hiring partners. Most graduates are employed within 3 months of completing the program.",
    qRu: "Помогаете ли с трудоустройством?",
    aRu: "Да. Мы помогаем с составлением резюме, оптимизацией профиля LinkedIn, проводим мок-интервью и подключаем вас к нашей сети компаний-партнёров. Большинство выпускников находят работу в течение 3 месяцев после завершения программы.",
  },
  {
    qEn: "What is the payment plan?",
    aEn: "$700/month for 7 months, totaling $5,000. Full upfront payment is also accepted at a discounted rate of $4,800. Payment plans are flexible — contact us to discuss options.",
    qRu: "Какой план оплаты?",
    aRu: "$700/месяц на протяжении 7 месяцев — итого $5,000. Полная оплата вперёд принимается по сниженной цене $4,800. Условия оплаты гибкие — свяжитесь с нами для обсуждения вариантов.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[var(--muted-bg)] transition-colors"
      >
        <span className="font-medium text-[var(--foreground)] text-sm">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--border)] pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const { lang, t } = useLanguage();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">
          {t("Frequently Asked Questions", "Часто задаваемые вопросы")}
        </h2>
        <p className="text-[var(--muted)] text-sm">
          {t(
            "Have more questions? Call us at 872-806-5906",
            "Остались вопросы? Позвоните нам: 872-806-5906"
          )}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            q={lang === "ru" ? faq.qRu : faq.qEn}
            a={lang === "ru" ? faq.aRu : faq.aEn}
          />
        ))}
      </div>
    </section>
  );
}
