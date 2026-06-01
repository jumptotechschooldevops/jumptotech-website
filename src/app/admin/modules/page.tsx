"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { DbModule } from "@/types/supabase-modules";

export default function AdminModulesPage() {
  const { role, authMounted } = useAuth();
  const [modules, setModules] = useState<DbModule[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    icon: '',
    description: '',
    color: '#000000',
    cover_image: '',
    total_hours: 0,
    order_index: 0
  });
  const [formError, setFormError] = useState("");
  const [toastMessage, setToastMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    fetchModules();
  }, []);


  async function fetchModules() {
    const { data } = await supabase.from('modules').select('*').order('order_index');
    if (data) setModules(data);
    setLoading(false);
  }

  const handleTogglePublish = async (id: string, current: boolean) => {
    await supabase.from('modules').update({ published: !current }).eq('id', id);
    fetchModules();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this module?')) {
      await supabase.from('modules').delete().eq('id', id);
      fetchModules();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'total_hours' || name === 'order_index' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setToastMessage(null);

    // Validate required fields
    if (!formData.title || !formData.slug || !formData.icon || !formData.description || !formData.color || !formData.cover_image) {
      setFormError("All text fields are required.");
      return;
    }

    try {
      const { error } = await supabase.from('modules').insert([{
        title: formData.title,
        slug: formData.slug,
        icon: formData.icon,
        description: formData.description,
        color: formData.color,
        cover_image: formData.cover_image,
        total_hours: formData.total_hours,
        order_index: formData.order_index,
        published: false
      }]).select();

      if (error) {
        console.error("Supabase insert error:", error);
        setFormError(error.message);
        setToastMessage({ type: 'error', text: `Failed to create module: ${error.message}` });
        return;
      }

      setToastMessage({ type: 'success', text: 'Module created successfully!' });
      setShowAddForm(false);

      // Reset form
      setFormData({
        title: '',
        slug: '',
        icon: '',
        description: '',
        color: '#000000',
        cover_image: '',
        total_hours: 0,
        order_index: 0
      });

      // Refresh list
      fetchModules();

      // Clear toast after 3s
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: unknown) {
      console.error("Unexpected error:", err);
      setFormError((err as Error).message || "An unexpected error occurred.");
      setToastMessage({ type: 'error', text: 'An unexpected error occurred.' });
    }
  };

  if (!authMounted) return null;
  if (role !== "admin") return <div className="p-12 text-center">Access Denied</div>;
  if (loading) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto relative">

      {toastMessage && (
        <div className={`fixed top-4 right-4 p-4 rounded text-white shadow-lg ${toastMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toastMessage.text}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Modules</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showAddForm ? 'Cancel' : 'Add Module'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create New Module</h2>
          {formError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">{formError}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon (Lucide name) *</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  placeholder="e.g. Terminal, GitBranch"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Color (Hex) *</label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded h-10"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  rows={3}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  name="cover_image"
                  value={formData.cover_image}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  placeholder="https://..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total Hours</label>
                <input
                  type="number"
                  name="total_hours"
                  value={formData.total_hours}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Order Index</label>
                <input
                  type="number"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
                Save Module
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">Title</th>
            <th className="py-2">Slug</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.map(mod => (
            <tr key={mod.id} className="border-b">
              <td className="py-2">{mod.title}</td>
              <td className="py-2">{mod.slug}</td>
              <td className="py-2">{mod.published ? 'Published' : 'Draft'}</td>
              <td className="py-2 flex gap-2">
                <button onClick={() => handleTogglePublish(mod.id, mod.published)} className="text-sm bg-gray-200 px-2 py-1 rounded text-black">
                  {mod.published ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => handleDelete(mod.id)} className="text-sm bg-red-600 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
