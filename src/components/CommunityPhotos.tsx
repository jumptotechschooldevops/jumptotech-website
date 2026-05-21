"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=600",
    captionEn: "Skydiving with Batch 2",
    captionRu: "Прыжок с парашютом с группой 2",
  },
  {
    src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600",
    captionEn: "Graduation Dinner",
    captionRu: "Выпускной ужин",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    captionEn: "Cooking Together",
    captionRu: "Готовим вместе",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
    captionEn: "Community Events",
    captionRu: "Мероприятия сообщества",
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
    captionEn: "Graduation Day",
    captionRu: "День выпуска",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600",
    captionEn: "Team Building",
    captionRu: "Тимбилдинг",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-default"
          >
            <Image
              src={photo.src}
              alt={t(photo.captionEn, photo.captionRu)}
              fill
              className="object-cover"
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
