import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VideoEmbed } from "@/components/VideoEmbed";
import { Linkedin, Check, ArrowRight } from "lucide-react";

import linkedinContent from "@/content/linkedin.json";

export default function LinkedinGuidePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />

          {/* HERO SECTION */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full mb-6">
              <Linkedin size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              {linkedinContent.hero.title}
            </h1>
            <p className="text-xl text-[var(--muted)]">
              {linkedinContent.hero.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">

            {/* MAIN SECTIONS */}
            <div className="lg:col-span-8 space-y-8">
              {linkedinContent.sections.map((section, idx) => (
                <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-3xl hover:border-[#0A66C2]/30 transition-colors duration-300">
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] text-white text-sm">
                      {idx + 1}
                    </span>
                    {section.title}
                  </h2>
                  <p className="text-[var(--muted)] leading-relaxed text-lg">
                    {section.content}
                  </p>
                </div>
              ))}

              {/* VIDEO SECTION */}
              {linkedinContent.videos && linkedinContent.videos.length > 0 && (
                <div className="pt-8">
                  <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Video Tutorials</h2>
                  <div className="space-y-8">
                    {linkedinContent.videos.map((vid, idx) => (
                      <div key={idx} className="bg-[var(--card-bg)] p-4 rounded-3xl border border-[var(--border)]">
                        <VideoEmbed url={vid.url} title={vid.title} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SIDEBAR: BEFORE/AFTER */}
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Before & After</h3>

                <div className="space-y-6">
                  {linkedinContent.beforeAfter.map((example, idx) => (
                    <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
                      <div className="p-5 bg-red-500/5 border-b border-red-500/10">
                        <span className="inline-block px-2 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded mb-2">BEFORE (Weak)</span>
                        <p className="text-sm text-[var(--foreground)] italic">&quot;{example.before}&quot;</p>
                      </div>

                      <div className="p-3 flex justify-center bg-[var(--background)]">
                        <ArrowRight className="text-[var(--muted)]" size={20} />
                      </div>

                      <div className="p-5 bg-[#0A66C2]/5 border-t border-[#0A66C2]/10">
                        <span className="inline-block px-2 py-1 bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold rounded mb-2 flex items-center w-fit gap-1">
                          <Check size={12} /> AFTER (Strong)
                        </span>
                        <p className="text-sm font-medium text-[var(--foreground)]">&quot;{example.after}&quot;</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}