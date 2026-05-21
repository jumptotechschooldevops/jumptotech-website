"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ImageIcon } from "lucide-react";

const photos = [
  {
    captionEn: "Skydiving with Batch 2",
    captionRu: "Прыжок с парашютом с группой 2",
    gradient: "from-blue-500 to-cyan-400",
    emoji: "🪂",
  },
  {
    captionEn: "Graduation Dinner",
    captionRu: "Выпускной ужин",
    gradient: "from-purple-500 to-pink-400",
    emoji: "🎓",
  },
  {
    captionEn: "Cooking Together",
    captionRu: "Готовим вместе",
    gradient: "from-orange-400 to-yellow-300",
    emoji: "👨‍🍳",
  },
  {
    captionEn: "Community Events",
    captionRu: "Мероприятия сообщества",
    gradient: "from-green-500 to-emerald-400",
    emoji: "🤝",
  },
];

export function CommunityPhotos() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">
          {t("Life at JumpToTech", "Жизнь в JumpToTech")}
        </h2>
        <p className="text-[var(--muted)]">
          {t(
            "We don't just teach DevOps — we build a community.",
            "Мы не только учим DevOps — мы строим сообщество."
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br ${photo.gradient} card-hover cursor-default`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-5xl">{photo.emoji}</span>
              <div className="flex items-center gap-1 text-white/60 text-xs">
                <ImageIcon size={12} />
                <span>{t("Photo coming soon", "Фото скоро")}</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-xs font-semibold text-center">
                {t(photo.captionEn, photo.captionRu)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
