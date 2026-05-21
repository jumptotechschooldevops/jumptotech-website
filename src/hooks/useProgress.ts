"use client";

import { useState, useEffect, useCallback } from "react";

interface ProgressStore {
  [moduleId: string]: {
    completedLectures: string[];
    completedLabs: string[];
  };
}

const STORAGE_KEY = "jumptotech_progress";

function loadProgress(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: ProgressStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function useProgress(moduleId: string) {
  const [store, setStore] = useState<ProgressStore>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStore(loadProgress());
    setMounted(true);
  }, []);

  const moduleProgress = store[moduleId] ?? { completedLectures: [], completedLabs: [] };

  const toggleLecture = useCallback((lectureId: string) => {
    setStore((prev) => {
      const mod = prev[moduleId] ?? { completedLectures: [], completedLabs: [] };
      const already = mod.completedLectures.includes(lectureId);
      const next: ProgressStore = {
        ...prev,
        [moduleId]: {
          ...mod,
          completedLectures: already
            ? mod.completedLectures.filter((id) => id !== lectureId)
            : [...mod.completedLectures, lectureId],
        },
      };
      saveProgress(next);
      return next;
    });
  }, [moduleId]);

  const toggleLab = useCallback((labId: string) => {
    setStore((prev) => {
      const mod = prev[moduleId] ?? { completedLectures: [], completedLabs: [] };
      const already = mod.completedLabs.includes(labId);
      const next: ProgressStore = {
        ...prev,
        [moduleId]: {
          ...mod,
          completedLabs: already
            ? mod.completedLabs.filter((id) => id !== labId)
            : [...mod.completedLabs, labId],
        },
      };
      saveProgress(next);
      return next;
    });
  }, [moduleId]);

  return {
    mounted,
    completedLectures: moduleProgress.completedLectures,
    completedLabs: moduleProgress.completedLabs,
    toggleLecture,
    toggleLab,
  };
}

export function useAllProgress() {
  const [store, setStore] = useState<ProgressStore>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStore(loadProgress());
    setMounted(true);

    const handleStorage = () => setStore(loadProgress());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const getModulePercent = useCallback(
    (moduleId: string, totalLectures: number, totalLabs: number) => {
      if (!mounted) return 0;
      const mod = store[moduleId];
      if (!mod) return 0;
      const total = totalLectures + totalLabs;
      if (total === 0) return 0;
      const done = mod.completedLectures.length + mod.completedLabs.length;
      return Math.round((done / total) * 100);
    },
    [store, mounted]
  );

  return { getModulePercent, mounted };
}
