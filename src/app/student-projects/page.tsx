"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard, ProjectProps } from "@/components/ProjectCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import projectsData from "@/content/projects.json";

export default function StudentProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...projectsData.categories];

  const filteredProjects = projectsData.projects.filter((project: ProjectProps) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === "All" || project.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />

          {/* HEADER */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              Student Projects
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-3xl">
              Explore the real-world infrastructure and automation projects built by JumpToTech students.
            </p>
          </div>

          {/* FILTERS & SEARCH */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between">

            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              <div className="flex items-center text-[var(--muted)] mr-2 shrink-0">
                <SlidersHorizontal size={18} className="mr-2" /> Filter:
              </div>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                    activeCategory === cat
                      ? "bg-[#185FA5] text-white"
                      : "bg-[var(--card-bg)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-[var(--muted)]" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-full text-sm focus:outline-none focus:border-[#185FA5] transition-colors"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* PROJECT GRID */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: ProjectProps) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl">
              <p className="text-[var(--muted)] text-lg mb-2">No projects found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="text-[#185FA5] font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}