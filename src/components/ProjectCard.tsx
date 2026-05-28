"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Calendar } from "lucide-react";
import { ShareButtons } from "./ShareButtons";

export type ProjectProps = {
  id: string;
  title: string;
  studentName: string;
  description: string;
  technologies: string[];
  image: string;
  category: string;
  githubLink?: string;
  docsLink?: string;
  date: string;
};

export function ProjectCard({ project }: { project: ProjectProps }) {
  return (
    <div className="group flex flex-col bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {project.category}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-1 line-clamp-1">{project.title}</h3>
            <p className="text-sm text-[var(--muted)] flex items-center gap-1">
              By {project.studentName}
            </p>
          </div>
        </div>

        <p className="text-[var(--muted)] text-sm mb-6 line-clamp-3 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map(tech => (
            <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#185FA5]/10 text-[#185FA5] border border-[#185FA5]/20">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] mt-auto mb-4">
          <div className="flex items-center text-xs text-[var(--muted)]">
            <Calendar size={14} className="mr-1" />
            {new Date(project.date).toLocaleDateString()}
          </div>
          <div className="flex gap-3">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[#185FA5] transition-colors">
                <Github size={20} />
              </a>
            )}
            {project.docsLink && project.docsLink !== "#" && (
              <a href={project.docsLink} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[#1D9E75] transition-colors">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-[var(--border)]">
          <ShareButtons url={`https://jumptotech.dev/student-projects?id=${project.id}`} title={`Check out this DevOps project: ${project.title} by ${project.studentName}`} />
        </div>
      </div>
    </div>
  );
}