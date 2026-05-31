"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { Github, ExternalLink, Calendar, PlayCircle } from "lucide-react";
import type { StudentProject, ProjectTestimonial } from "@/types/supabase-projects";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<StudentProject | null>(null);
  const [testimonials, setTestimonials] = useState<ProjectTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("student_projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Error fetching project:", error);
        router.push("/student-projects");
        return;
      }

      setProject(data as StudentProject);
      setLoading(false);

      const fetchTestimonials = async () => {
        const { data: testData } = await supabase
          .from("project_testimonials")
          .select("*")
          .eq("project_id", id);
        if (testData) {
          setTestimonials(testData);
        }
      };

      fetchTestimonials();

      // Increment view counter via API or direct update (if RLS allows or via RPC)
      // For simplicity, we assume RLS allows public to call an RPC or update analytics if we made a secure route
      supabase.rpc("increment_project_view", { project_id: id }).then(({error}) => { if(error) console.error(error) });
    };

    fetchProject();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-xl text-[var(--muted)]">Loading project details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) return null;

  const safeTechnologies = Array.isArray(project.technologies)
    ? project.technologies
    : typeof project.technologies === 'string'
    ? (project.technologies as string).split(',').map(t => t.trim()).filter(Boolean)
    : [];

  const safeScreenshotUrls = Array.isArray(project.screenshot_urls)
    ? project.screenshot_urls
    : typeof project.screenshot_urls === 'string'
    ? (project.screenshot_urls as string).split(',').map(t => t.trim()).filter(Boolean)
    : [];

  const safeVideoUrls = Array.isArray(project.video_urls)
    ? project.video_urls
    : typeof project.video_urls === 'string'
    ? (project.video_urls as string).split(',').map(t => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-10 text-center">
            <span className="inline-block px-3 py-1 bg-[#185FA5]/10 text-[#185FA5] rounded-full text-sm font-medium mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-[var(--muted)] flex items-center justify-center gap-2">
              By {project.student_name}
              <span className="text-gray-300 mx-2">|</span>
              <Calendar size={18} /> {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Video or Thumbnail */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl bg-black/5 border border-[var(--border)]">
            {project.youtube_url ? (
              <iframe
                src={project.youtube_url.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allowFullScreen
              />
            ) : safeVideoUrls.length > 0 ? (
              <video
                src={safeVideoUrls[0]}
                controls
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <Image
                src={project.thumbnail_url || "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200"}
                alt={project.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <div className="prose dark:prose-invert max-w-none text-[var(--muted)] whitespace-pre-wrap">
                  {project.description}
                </div>
              </section>

              {safeScreenshotUrls.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {safeScreenshotUrls.map((url, i) => (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-[var(--border)] cursor-pointer hover:opacity-90 transition">
                        <Image src={url} alt={`Screenshot ${i+1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Links</h3>
                <div className="space-y-3">
                  {project.demo_url && (
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#185FA5] hover:underline font-medium">
                      <PlayCircle size={20} /> Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--foreground)] hover:text-[#185FA5] transition-colors font-medium">
                      <Github size={20} /> GitHub Repository
                    </a>
                  )}
                  {project.documentation_url && (
                    <a href={project.documentation_url} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#1D9E75] hover:underline font-medium bg-[#1D9E75]/10 px-4 py-2 rounded-lg transition-colors hover:bg-[#1D9E75]/20">
                      <ExternalLink size={20} /> Download Documentation
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {safeTechnologies.map(tech => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#185FA5]/10 text-[#185FA5]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Success Stories / Testimonials */}
          {testimonials.length > 0 && (
            <div className="mt-16 pt-16 border-t border-[var(--border)]">
              <h2 className="text-3xl font-bold mb-8 text-center">Student Success Story</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        {t.photo_url ? (
                          <Image src={t.photo_url} alt={t.student_name} width={48} height={48} className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#185FA5] text-white font-bold">
                            {t.student_name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--foreground)]">{t.student_name}</h4>
                        <p className="text-sm text-[var(--muted)]">{t.job_title} {t.company_name && `@ ${t.company_name}`}</p>
                      </div>
                    </div>
                    <blockquote className="text-[var(--muted)] italic">
                      &quot;{t.testimonial}&quot;
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}