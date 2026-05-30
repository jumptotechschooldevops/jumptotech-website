"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, UploadCloud, X, FileVideo, FileImage, FileText } from "lucide-react";
import type { StudentProject } from "@/types/supabase-projects";

export default function AdminProjectsPage() {
  const { user, authMounted } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<StudentProject> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (authMounted) {
      if (!user || (!user.email?.includes("admin"))) {
        router.push("/");
      }
    }
  }, [user, authMounted, router]);

  if (!authMounted || !user || !user.email?.includes("admin")) return null;


  const fetchProjects = async () => {
    setIsFetching(true);
    const { data, error } = await supabase
      .from('student_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data as StudentProject[]);
    } else {
      console.error("Error fetching projects:", error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from('student_projects').delete().eq('id', id);
    if (!error) {
      setProjects(prev => prev.filter(p => p.id !== id));
    } else {
      alert("Failed to delete project.");
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('student_projects').update({ published: !currentStatus }).eq('id', id);
    if (!error) {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, published: !currentStatus } : p));
    }
  };


  const deleteUploadedFile = async (bucket: string, fileUrl: string, fieldName: keyof StudentProject, isArray: boolean = false) => {
    try {
      // Extract file path from URL
      const urlParts = fileUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // We don't necessarily know the exact folder path if it's deeply nested,
      // but based on upload logic filePath = `${Date.now()}-${fileName}` in root of bucket
      const filePath = fileName;

      const { error } = await supabase.storage.from(bucket).remove([filePath]);

      if (error) {
        console.error("Error deleting file:", error);
        alert(`Failed to delete file: ${error.message}`);
        return;
      }

      // Update state
      setCurrentProject(prev => {
        if (!prev) return prev;

        if (isArray) {
          const existing = (prev[fieldName] as string[]) || [];
          return { ...prev, [fieldName]: existing.filter(url => url !== fileUrl) };
        } else {
          return { ...prev, [fieldName]: null };
        }
      });

    } catch (err) {
      console.error("Delete exception:", err);
    }
  };


  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('student_projects').update({ featured: !currentStatus }).eq('id', id);
    if (!error) {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, featured: !currentStatus } : p));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, bucket: string, fieldName: keyof StudentProject, isArray: boolean = false) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const urls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${Date.now()}-${fileName}`;

      setUploadProgress(prev => ({ ...prev, [file.name]: 10 }));

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert(`Failed to upload ${file.name}: ${uploadError.message || JSON.stringify(uploadError)}`);
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        continue;
      }

      setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      urls.push(data.publicUrl);
    }

    if (isArray) {
      setCurrentProject(prev => {
        const existing = (prev?.[fieldName] as string[]) || [];
        return { ...prev, [fieldName]: [...existing, ...urls] };
      });
    } else {
      setCurrentProject(prev => ({ ...prev, [fieldName]: urls[0] }));
    }

    setTimeout(() => {
      setUploadProgress({});
    }, 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Ensure technologies is an array if edited as comma separated string
    let techArray = currentProject?.technologies || [];
    if (typeof currentProject?.technologies === 'string') {
      techArray = (currentProject.technologies as string).split(',').map(s => s.trim()).filter(Boolean);
    }

    const payload = {
      ...currentProject,
      technologies: techArray,
      updated_at: new Date().toISOString()
    };

    if (payload.id) {
      // Update
      const { error } = await supabase.from('student_projects').update(payload).eq('id', payload.id);
      if (!error) {
        fetchProjects();
        setIsModalOpen(false);
      } else {
        alert("Error saving project: " + error.message);
      }
    } else {
      // Insert
      const { error } = await supabase.from('student_projects').insert([payload]);
      if (!error) {
        fetchProjects();
        setIsModalOpen(false);
      } else {
        alert("Error creating project: " + error.message);
      }
    }
    setIsSaving(false);
  };

  if (isFetching) return <div className="p-10 text-center">Loading Admin...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-[var(--background)]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Student Projects</h1>
        <button
          onClick={() => { setCurrentProject({}); setIsModalOpen(true); }}
          className="bg-[#185FA5] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#185FA5]/90 flex items-center gap-2"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#185FA5]/5 text-[var(--muted)]">
            <tr>
              <th className="p-4 font-medium">Project Title</th>
              <th className="p-4 font-medium">Student</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {projects.length === 0 ? (
              <tr><td colSpan={6} className="p-4 text-center text-[var(--muted)]">No projects found.</td></tr>
            ) : (
              projects.map(proj => (
                <tr key={proj.id} className="hover:bg-[var(--background)]">
                  <td className="p-4 font-medium">{proj.title}</td>
                  <td className="p-4">{proj.student_name}</td>
                  <td className="p-4"><span className="bg-[#185FA5]/10 text-[#185FA5] px-2 py-1 rounded text-xs">{proj.category}</span></td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(proj.id, proj.published)}
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${proj.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {proj.published ? <><Eye size={14} /> Published</> : <><EyeOff size={14} /> Draft</>}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleFeatured(proj.id, proj.featured)}
                      className={`p-1 rounded ${proj.featured ? 'text-yellow-500' : 'text-gray-400'}`}
                    >
                      <Star size={18} fill={proj.featured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => { setCurrentProject(proj); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(proj.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-[var(--card-bg)] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[var(--border)] flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-bold">{currentProject?.id ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--muted)] hover:text-[var(--foreground)]">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <form id="project-form" onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Title</label>
                    <input required type="text" value={currentProject?.title || ''} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} className="w-full border rounded-lg p-2 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Student Name</label>
                    <input required type="text" value={currentProject?.student_name || ''} onChange={e => setCurrentProject({...currentProject, student_name: e.target.value})} className="w-full border rounded-lg p-2 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Student Email</label>
                    <input required type="email" value={currentProject?.student_email || ''} onChange={e => setCurrentProject({...currentProject, student_email: e.target.value})} className="w-full border rounded-lg p-2 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select required value={currentProject?.category || ''} onChange={e => setCurrentProject({...currentProject, category: e.target.value})} className="w-full border rounded-lg p-2 bg-transparent">
                      <option value="">Select Category</option>
                      <option value="AWS">AWS</option>
                      <option value="Linux">Linux</option>
                      <option value="Docker">Docker</option>
                      <option value="Kubernetes">Kubernetes</option>
                      <option value="Terraform">Terraform</option>
                      <option value="Jenkins">Jenkins</option>
                      <option value="GitHub Actions">GitHub Actions</option>
                      <option value="Python">Python</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Cloud">Cloud</option>
                      <option value="AI">AI</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea required rows={4} value={currentProject?.description || ''} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} className="w-full border rounded-lg p-2 bg-transparent"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Technologies (Comma separated)</label>
                  <input type="text" value={Array.isArray(currentProject?.technologies) ? currentProject.technologies.join(', ') : (currentProject?.technologies || '')} onChange={e => setCurrentProject({...currentProject, technologies: e.target.value as unknown as string[]})} className="w-full border rounded-lg p-2 bg-transparent" placeholder="e.g. Docker, AWS, React" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub URL</label>
                    <input type="url" value={currentProject?.github_url || ''} onChange={e => setCurrentProject({...currentProject, github_url: e.target.value})} className="w-full border rounded-lg p-2 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Live Demo URL</label>
                    <input type="url" value={currentProject?.demo_url || ''} onChange={e => setCurrentProject({...currentProject, demo_url: e.target.value})} className="w-full border rounded-lg p-2 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">YouTube Video URL</label>
                    <input type="url" value={currentProject?.youtube_url || ''} onChange={e => setCurrentProject({...currentProject, youtube_url: e.target.value})} className="w-full border rounded-lg p-2 bg-transparent" />
                  </div>
                </div>

                {/* Uploads Section */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-bold mb-4">Media Uploads</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Thumbnail */}
                    <div className="border border-dashed p-4 rounded-xl">
                      <label className="flex flex-col items-center cursor-pointer">
                        <FileImage className="text-gray-400 mb-2" />
                        <span className="text-sm font-medium">Upload Thumbnail (JPG/PNG)</span>
                        <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'student-project-images', 'thumbnail_url')} />
                      </label>
                      {currentProject?.thumbnail_url && (
                        <div className="mt-2 flex items-center justify-between text-xs text-green-600">
                          <span className="truncate mr-2">Uploaded</span>
                          <button type="button" onClick={(e) => { e.preventDefault(); deleteUploadedFile('student-project-images', currentProject.thumbnail_url!, 'thumbnail_url', false); }} className="text-red-500 hover:text-red-700 flex items-center"><X size={14} className="mr-1"/> Remove</button>
                        </div>
                      )}
                    </div>

                    {/* Screenshots */}
                    <div className="border border-dashed p-4 rounded-xl">
                      <label className="flex flex-col items-center cursor-pointer">
                        <FileImage className="text-gray-400 mb-2" />
                        <span className="text-sm font-medium">Upload Screenshots (Multiple)</span>
                        <input type="file" className="hidden" multiple accept="image/*" onChange={e => handleFileUpload(e, 'student-project-images', 'screenshot_urls', true)} />
                      </label>
                      {currentProject?.screenshot_urls?.length ? (
                        <div className="mt-2 text-xs text-green-600 flex flex-col gap-1">
                          {currentProject.screenshot_urls.map((url, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="truncate mr-2">Image {i+1}</span>
                              <button type="button" onClick={(e) => { e.preventDefault(); deleteUploadedFile('student-project-images', url, 'screenshot_urls', true); }} className="text-red-500 hover:text-red-700 flex items-center"><X size={14} className="mr-1"/> Remove</button>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {/* Videos */}
                    <div className="border border-dashed p-4 rounded-xl">
                      <label className="flex flex-col items-center cursor-pointer">
                        <FileVideo className="text-gray-400 mb-2" />
                        <span className="text-sm font-medium">Upload Videos (MP4/MOV)</span>
                        <input type="file" className="hidden" multiple accept="video/*" onChange={e => handleFileUpload(e, 'student-project-videos', 'video_urls', true)} />
                      </label>
                      {currentProject?.video_urls?.length ? (
                        <div className="mt-2 text-xs text-green-600 flex flex-col gap-1">
                          {currentProject.video_urls.map((url, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="truncate mr-2">Video {i+1}</span>
                              <button type="button" onClick={(e) => { e.preventDefault(); deleteUploadedFile('student-project-videos', url, 'video_urls', true); }} className="text-red-500 hover:text-red-700 flex items-center"><X size={14} className="mr-1"/> Remove</button>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {/* PDF Documentation */}
                    <div className="border border-dashed p-4 rounded-xl">
                      <label className="flex flex-col items-center cursor-pointer">
                        <FileText className="text-gray-400 mb-2" />
                        <span className="text-sm font-medium">Upload Documentation (PDF)</span>
                        <input type="file" className="hidden" accept="application/pdf" onChange={e => handleFileUpload(e, 'student-project-documents', 'documentation_url')} />
                      </label>
                      {currentProject?.documentation_url && (
                        <div className="mt-2 flex items-center justify-between text-xs text-green-600">
                          <span className="truncate mr-2">Uploaded Document</span>
                          <button type="button" onClick={(e) => { e.preventDefault(); deleteUploadedFile('student-project-documents', currentProject.documentation_url!, 'documentation_url', false); }} className="text-red-500 hover:text-red-700 flex items-center"><X size={14} className="mr-1"/> Remove</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {Object.entries(uploadProgress).map(([fileName, progress]) => (
                    <div key={fileName} className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{fileName}</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-[#185FA5] h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-[var(--border)] flex justify-end gap-3 bg-[var(--card-bg)] shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
              <button type="submit" form="project-form" disabled={isSaving} className="px-4 py-2 bg-[#185FA5] text-white rounded-lg hover:bg-[#185FA5]/90 disabled:opacity-50">
                {isSaving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}