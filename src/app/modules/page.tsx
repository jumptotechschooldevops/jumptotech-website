"use client";

import { ModuleCard } from "@/components/ModuleCard";
import { useAllProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, FlaskConical, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DbModule } from "@/types/supabase-modules";

export default function ModulesPage() {
  const { getModulePercent, mounted } = useAllProgress();
  const { loggedIn, mounted: authMounted } = useAuth();
  const router = useRouter();

  const [modulesData, setModulesData] = useState<DbModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authMounted && !loggedIn) {
      router.replace("/login");
    }
  }, [authMounted, loggedIn, router]);

  useEffect(() => {
    const fetchModules = async () => {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('published', true)
        .order('order_index', { ascending: true });

      if (!error && data) {
        // Fetch lecture and lab counts
        const mods = await Promise.all(data.map(async (m) => {
          const { count: lectureCount } = await supabase.from('lectures').select('*', { count: 'exact', head: true }).eq('module_id', m.id).eq('published', true);
          const { count: labCount } = await supabase.from('labs').select('*', { count: 'exact', head: true }).eq('module_id', m.id).eq('published', true);
          return {
            ...m,
            lectureCount: lectureCount || 0,
            labCount: labCount || 0,
          };
        }));
        setModulesData(mods);
      }
      setLoading(false);
    };
    fetchModules();
  }, []);

  const totalLectures = modulesData.reduce((s, m) => s + (m.lectureCount || 0), 0);
  const totalLabs = modulesData.reduce((s, m) => s + (m.labCount || 0), 0);
  const totalHours = modulesData.reduce((s, m) => s + m.total_hours, 0);

  if (!authMounted || !loggedIn) return null;
  if (loading) return <div className="p-12 text-center text-[var(--muted)]">Loading modules...</div>;

  return (
    <div className="bg-[var(--background)]">

      {/* Header */}
      <div className="bg-[var(--card-bg)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-3">
            All Modules
          </h1>
          <p className="text-[var(--muted)] text-lg mb-6 max-w-2xl">
            Everything you need to go from beginner to production-ready DevOps engineer. Pick any module and start learning.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#185FA5]" />
              <strong className="text-[var(--foreground)]">{totalLectures}</strong> lectures
            </span>
            <span className="flex items-center gap-2">
              <FlaskConical size={16} className="text-[#1D9E75]" />
              <strong className="text-[var(--foreground)]">{totalLabs}</strong> labs
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-purple-500" />
              <strong className="text-[var(--foreground)]">{totalHours}+</strong> hours of content
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {modulesData.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={{
                id: mod.id,
                slug: mod.slug,
                title: mod.title,
                icon: mod.icon,
                description: mod.description,
                color: mod.color,
                coverImage: mod.cover_image,
                lectureCount: mod.lectureCount || 0,
                labCount: mod.labCount || 0,
                totalHours: mod.total_hours,
                mkdocsUrl: "", // deprecated
                lectures: [],
                labs: [],
              }}
              progress={mounted ? getModulePercent(mod.id, mod.lectureCount || 0, mod.labCount || 0) : 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
