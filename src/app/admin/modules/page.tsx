"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { DbModule } from "@/types/supabase-modules";

export default function AdminModulesPage() {
  const { role, authMounted } = useAuth();
  const [modules, setModules] = useState<DbModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchModules() {
    const { data } = await supabase.from('modules').select('*').order('order_index');
    if (data) setModules(data);
    setLoading(false);
  };

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

  const handleAdd = async () => {
    const title = prompt('Enter module title:');
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await supabase.from('modules').insert([{ title, slug }]);
    fetchModules();
  };

  if (!authMounted) return null;
  if (role !== "admin") return <div className="p-12 text-center">Access Denied</div>;
  if (loading) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Modules</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add Module</button>
      </div>

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
