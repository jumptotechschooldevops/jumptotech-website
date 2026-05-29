"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProjectCard } from "@/components/ProjectCard";
import type { StudentProject } from "@/types/supabase-projects";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function FeaturedProjects() {
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from('student_projects')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setProjects(data as StudentProject[]);
      }
      setLoading(false);
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-[var(--muted)]">Loading featured projects...</div>;
  }

  if (projects.length === 0) {
    return null; // Hide section if no featured projects exist
  }

  return (
    <section className="bg-[var(--background)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star size={20} className="text-yellow-500" fill="currentColor" />
              <h2 className="text-3xl font-bold text-[var(--foreground)]">Featured Student Projects</h2>
            </div>
            <p className="text-[var(--muted)]">See what our students are building after completing the bootcamp.</p>
          </div>
          <Link href="/student-projects" className="hidden sm:flex items-center gap-2 text-[#185FA5] font-medium hover:underline">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link href="/student-projects" className="inline-flex items-center gap-2 text-[#185FA5] font-medium hover:underline">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}