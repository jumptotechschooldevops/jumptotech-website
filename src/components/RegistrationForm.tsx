"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, CheckCircle2 } from "lucide-react";

export function RegistrationForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    referral: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("JumpToTech Batch 4 Registration");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nExperience: ${form.experience}\nHeard about us: ${form.referral}\nMessage: ${form.message}`
    );
    window.location.href = `mailto:aisalkynaidarova8@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="register" className="bg-[var(--card-bg)] border-y border-[var(--border)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">
            {t("Register for Batch 4", "Записаться на Набор 4")}
          </h2>
          <p className="text-[var(--muted)]">
            {t(
              "Fill out the form below and we'll be in touch within 24 hours.",
              "Заполните форму ниже, и мы свяжемся с вами в течение 24 часов."
            )}
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <CheckCircle2 size={56} className="text-[#1D9E75] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
              {t("Thank you!", "Спасибо!")}
            </h3>
            <p className="text-[var(--muted)]">
              {t(
                "Your registration has been submitted. We'll reach out to you soon!",
                "Ваша заявка отправлена. Мы скоро свяжемся с вами!"
              )}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm text-[#185FA5] hover:underline"
            >
              {t("Submit another", "Отправить ещё раз")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  {t("Full Name", "Полное имя")} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={t("Your full name", "Ваше полное имя")}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  {t("Email", "Email")} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  {t("Phone Number", "Номер телефона")} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  {t("Experience Level", "Уровень опыта")} *
                </label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    {t("Select your level", "Выберите уровень")}
                  </option>
                  <option value="Beginner">{t("Beginner", "Начинающий")}</option>
                  <option value="Some IT experience">
                    {t("Some IT experience", "Есть базовые IT знания")}
                  </option>
                  <option value="Career changer">
                    {t("Career changer", "Смена профессии")}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                {t("How did you hear about us?", "Как вы узнали о нас?")}
              </label>
              <input
                type="text"
                name="referral"
                value={form.referral}
                onChange={handleChange}
                placeholder={t(
                  "Google, Instagram, friend referral...",
                  "Google, Instagram, знакомые..."
                )}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                {t("Message (optional)", "Сообщение (необязательно)")}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder={t(
                  "Any questions or additional info...",
                  "Вопросы или дополнительная информация..."
                )}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#185FA5] text-white font-semibold hover:bg-[#0f4a8a] transition-colors text-sm"
            >
              <Send size={16} />
              {t("Submit Registration", "Отправить заявку")}
            </button>

            <p className="text-xs text-center text-[var(--muted)]">
              {t(
                "By submitting you agree to be contacted by JumpToTech.",
                "Отправляя форму, вы соглашаетесь на контакт со стороны JumpToTech."
              )}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
