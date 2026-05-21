"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const photos = [
  {
    src: "/community/photo1.jpeg",
    captionEn: "Skydiving adventure with our community",
    captionRu: "Прыжки с парашютом с нашим сообществом",
  },
  {
    src: "/community/photo2.jpeg",
    captionEn: "Team dinner after graduation",
    captionRu: "Командный ужин после выпуска",
  },
  {
    src: "/community/photo3.jpeg",
    captionEn: "Ready to jump! Batch 2 skydiving day",
    captionRu: "Готовы прыгать! День прыжков группы 2",
  },
  {
    src: "/community/photo4.jpeg",
    captionEn: "Celebrating together",
    captionRu: "Празднуем вместе",
  },
  {
    src: "/community/photo5.jpeg",
    captionEn: "Our amazing students",
    captionRu: "Наши замечательные студенты",
  },
  {
    src: "/community/photo6.jpeg",
    captionEn: "Community gathering",
    captionRu: "Встреча сообщества",
  },
  {
    src: "/community/photo7.jpeg",
    captionEn: "JumpToTech event night",
    captionRu: "Вечер мероприятий JumpToTech",
  },
  {
    src: "/community/photo8.jpeg",
    captionEn: "Graduation celebration",
    captionRu: "Праздник выпуска",
  },
  {
    src: "/community/photo9.jpeg",
    captionEn: "Cooking together",
    captionRu: "Готовим вместе",
  },
  {
    src: "/community/photo10.jpeg",
    captionEn: "Friends for life",
    captionRu: "Друзья на всю жизнь",
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

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden break-inside-avoid mb-4 cursor-default"
          >
            <Image
              src={photo.src}
              alt={t(photo.captionEn, photo.captionRu)}
              width={600}
              height={450}
              className="w-full h-auto block object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-8 pb-3 px-3">
              <p className="text-white text-sm font-semibold text-center drop-shadow">
                {t(photo.captionEn, photo.captionRu)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
