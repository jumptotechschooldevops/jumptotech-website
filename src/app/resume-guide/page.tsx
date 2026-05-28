import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VideoEmbed } from "@/components/VideoEmbed";
import { FileText, Download, CheckCircle2, AlertCircle } from "lucide-react";

// Import local JSON content instead of hardcoding
import resumeContent from "@/content/resume.json";

export default function ResumeGuidePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />

          {/* HERO SECTION */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              {resumeContent.hero.title}
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-3xl">
              {resumeContent.hero.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">

            {/* MAIN CONTENT */}
            <div className="lg:col-span-2 space-y-16">

              {/* STRUCTURE SECTION */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-[#185FA5]/10 text-[#185FA5]">
                    <FileText size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--foreground)]">Resume Structure</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {resumeContent.structure.map((item, idx) => (
                    <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl">
                      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                        <span className="text-[#185FA5]">{idx + 1}.</span> {item.title}
                      </h3>
                      <p className="text-[var(--muted)] text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* TIPS SECTION */}
              <section>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Pro Tips</h2>
                <div className="space-y-4">
                  {resumeContent.tips.map((tip, idx) => (
                    <div key={idx} className="flex gap-4 p-5 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl">
                      <div className="shrink-0 pt-1">
                        {idx % 2 === 0 ? (
                          <CheckCircle2 className="text-[#1D9E75]" size={20} />
                        ) : (
                          <AlertCircle className="text-yellow-500" size={20} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--foreground)] mb-1">{tip.title}</h4>
                        <p className="text-sm text-[var(--muted)]">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* VIDEO SECTION */}
              {resumeContent.videos && resumeContent.videos.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Video Walkthrough</h2>
                  {resumeContent.videos.map((vid, idx) => (
                    <VideoEmbed key={idx} url={vid.url} title={vid.title} />
                  ))}
                </section>
              )}

            </div>

            {/* SIDEBAR: EXAMPLE & DOWNLOAD */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">

                <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-6 text-center border-b border-[var(--border)] pb-4">
                    ATS-Friendly Example
                  </h3>

                  {/* LIVE EDITABLE RESUME PREVIEW */}
                  <div className="bg-white text-black p-6 rounded-lg shadow-inner text-xs sm:text-sm font-sans space-y-4 border border-gray-200">
                    <div className="text-center border-b border-gray-300 pb-3">
                      <h4 className="text-xl font-serif font-bold uppercase">{resumeContent.resumeExample.name}</h4>
                      <p className="text-gray-600">{resumeContent.resumeExample.title}</p>
                      <p className="text-gray-500 text-[10px] mt-1">{resumeContent.resumeExample.contact}</p>
                    </div>

                    <div>
                      <p className="font-bold border-b border-gray-300 mb-1 uppercase text-gray-800">Summary</p>
                      <p className="text-gray-700 leading-relaxed">{resumeContent.resumeExample.summary}</p>
                    </div>

                    <div>
                      <p className="font-bold border-b border-gray-300 mb-1 uppercase text-gray-800">Skills</p>
                      <ul className="list-disc pl-4 text-gray-700 space-y-1">
                        {Object.entries(resumeContent.resumeExample.skills).map(([category, skills]) => (
                          <li key={category}><strong>{category}:</strong> {skills}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold border-b border-gray-300 mb-1 uppercase text-gray-800">Experience</p>
                      {resumeContent.resumeExample.experience.map((exp, idx) => (
                        <div key={idx} className="mb-3 last:mb-0">
                          <div className="flex justify-between font-bold text-gray-800">
                            <span>{exp.role}</span>
                            <span className="text-gray-500 text-[10px]">{exp.dates}</span>
                          </div>
                          <div className="text-gray-600 italic mb-1">{exp.company}</div>
                          <ul className="list-disc pl-4 text-gray-700 space-y-1">
                            {exp.bullets.map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={resumeContent.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-full flex items-center justify-center gap-2 bg-[#185FA5] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#185FA5]/90 transition shadow-md hover:shadow-lg"
                  >
                    <Download size={20} />
                    Download PDF Template
                  </a>
                  <p className="text-center text-xs text-[var(--muted)] mt-3">
                    Placeholder template. Add real PDF later.
                  </p>
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