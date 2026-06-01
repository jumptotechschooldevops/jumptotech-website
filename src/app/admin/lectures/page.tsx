"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { DbLecture, DbModule } from "@/types/supabase-modules";

export default function AdminLecturesPage() {
  const { role, authMounted } = useAuth();
  const [modules, setModules] = useState<DbModule[]>([]);
  const [lectures, setLectures] = useState<DbLecture[]>([]);
  const [selectedModuleSlug, setSelectedModuleSlug] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLecture, setEditingLecture] = useState<DbLecture | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formType, setFormType] = useState("reading");
  const [formDuration, setFormDuration] = useState("10 min");
  const [formVideoUrl, setFormVideoUrl] = useState("");
  const [formPdfUrl, setFormPdfUrl] = useState("");

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    if (selectedModuleSlug) {
      fetchLectures(selectedModuleSlug);
    } else {
      setLectures([]);
    }
  }, [selectedModuleSlug]);

  async function fetchModules() {
    const { data } = await supabase.from('modules').select('*').order('title');
    if (data) {
      setModules(data);
      if (data.length > 0 && !selectedModuleSlug) setSelectedModuleSlug(data[0].slug);
    }
    setLoading(false);
  }

  async function fetchLectures(moduleSlug: string) {
    setLoading(true);
    const { data } = await supabase.from('lectures').select('*').eq('module_slug', moduleSlug).order('order_index');
    if (data) setLectures(data);
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lecture?')) {
      await supabase.from('lectures').delete().eq('id', id);
      fetchLectures(selectedModuleSlug);
    }
  };

  const openAddModal = () => {
    if (!selectedModuleSlug) return alert('Select a module first');
    setEditingLecture(null);
    setFormTitle("");
    setFormDescription("");
    setFormContent("");
    setFormType("reading");
    setFormDuration("10 min");
    setFormVideoUrl("");
    setFormPdfUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (lec: DbLecture) => {
    setEditingLecture(lec);
    setFormTitle(lec.title);
    setFormDescription(lec.description || "");
    setFormContent(lec.content || "");
    setFormType(lec.type || "reading");
    setFormDuration(lec.duration || "10 min");
    setFormVideoUrl(lec.video_url || "");
    setFormPdfUrl(lec.pdf_url || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLecture(null);
  };

  const handleSave = async () => {
    if (!formTitle.trim()) return alert("Title is required");

    const payload = {
      title: formTitle,
      description: formDescription,
      content: formContent,
      type: formType,
      duration: formDuration,
      video_url: formVideoUrl,
      pdf_url: formPdfUrl,
      module_slug: selectedModuleSlug,
    };

    if (editingLecture) {
      await supabase.from('lectures').update(payload).eq('id', editingLecture.id);
    } else {
      const newOrderIndex = lectures.length;
      await supabase.from('lectures').insert([{ ...payload, order_index: newOrderIndex }]);
    }

    closeModal();
    fetchLectures(selectedModuleSlug);
  };

  // Drag and Drop support
  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDrop = async (e: React.DragEvent<HTMLTableRowElement>, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('index'), 10);
    if (sourceIndex === targetIndex) return;

    const newLectures = [...lectures];
    const [movedItem] = newLectures.splice(sourceIndex, 1);
    newLectures.splice(targetIndex, 0, movedItem);

    // Update order optimistically
    setLectures(newLectures);

    // Update DB
    const updates = newLectures.map((lec, idx) => ({ id: lec.id, order_index: idx }));
    for (const update of updates) {
      await supabase.from('lectures').update({ order_index: update.order_index }).eq('id', update.id);
    }
  };

  if (!authMounted) return null;
  if (role !== "admin") return <div className="p-12 text-center">Access Denied</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Lectures</h1>
        <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Add Lecture
        </button>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Module:</label>
        <select
          className="border p-2 rounded text-black bg-white"
          value={selectedModuleSlug}
          onChange={e => setSelectedModuleSlug(e.target.value)}
        >
          {modules.map(m => (
            <option key={m.id} value={m.slug}>{m.title}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Order</th>
              <th className="py-2">Title</th>
              <th className="py-2">Type</th>
              <th className="py-2">Duration</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lec, idx) => (
              <tr
                key={lec.id}
                className="border-b cursor-move hover:bg-gray-800"
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, idx)}
              >
                <td className="py-2 text-gray-500">☰</td>
                <td className="py-2">{lec.title}</td>
                <td className="py-2">{lec.type}</td>
                <td className="py-2">{lec.duration}</td>
                <td className="py-2 flex gap-2">
                  <button onClick={() => openEditModal(lec)} className="text-sm bg-gray-600 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(lec.id)} className="text-sm bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {lectures.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No lectures found for this module.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingLecture ? "Edit Lecture" : "Add Lecture"}</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-400">Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded p-2 text-white"
                  placeholder="Lecture Title"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-400">Description</label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded p-2 text-white"
                  placeholder="Short description"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-400">Type</label>
                <select
                  value={formType}
                  onChange={e => setFormType(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded p-2 text-white [&>option]:text-black"
                >
                  <option value="reading">Reading</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-400">Duration</label>
                <input
                  type="text"
                  value={formDuration}
                  onChange={e => setFormDuration(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded p-2 text-white"
                  placeholder="e.g. 15 min"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-400">Video URL (Optional)</label>
                <input
                  type="text"
                  value={formVideoUrl}
                  onChange={e => setFormVideoUrl(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded p-2 text-white"
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-400">PDF URL (Optional)</label>
                <input
                  type="text"
                  value={formPdfUrl}
                  onChange={e => setFormPdfUrl(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded p-2 text-white"
                  placeholder="https://example.com/file.pdf"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-400">Content (Markdown)</label>
                <textarea
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                  className="w-full bg-transparent border border-gray-700 rounded p-2 text-white h-48 font-mono text-sm"
                  placeholder="Write the lecture content in markdown..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={closeModal} className="px-4 py-2 border border-gray-700 rounded hover:bg-gray-800">
                  Cancel
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
