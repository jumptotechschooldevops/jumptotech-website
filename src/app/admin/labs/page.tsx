"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { DbLab, DbModule } from "@/types/supabase-modules";

export default function AdminLabsPage() {
  const { role, authMounted } = useAuth();
  const [modules, setModules] = useState<DbModule[]>([]);
  const [labs, setLabs] = useState<DbLab[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    if (selectedModuleId) {
      fetchLabs(selectedModuleId);
    } else {
      setLabs([]);
    }
  }, [selectedModuleId]);

  async function fetchModules() {
    const { data } = await supabase.from('modules').select('*').order('title');
    if (data) {
      setModules(data);
      if (data.length > 0 && !selectedModuleId) setSelectedModuleId((data as DbModule[])[0].id);
    }
    setLoading(false);
  };


  async function fetchLabs(moduleId: string) {
    setLoading(true);
    const { data } = await supabase.from('labs').select('*').eq('module_id', moduleId).order('order_index');
    if (data) setLabs(data);
    setLoading(false);
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await supabase.from('labs').update({ published: !current }).eq('id', id);
    fetchLabs(selectedModuleId);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lab?')) {
      await supabase.from('labs').delete().eq('id', id);
      fetchLabs(selectedModuleId);
    }
  };

  const handleAdd = async () => {
    if (!selectedModuleId) return alert('Select a module first');
    const title = prompt('Enter lab title:');
    if (!title) return;
    await supabase.from('labs').insert([{ title, module_id: selectedModuleId, difficulty: 'beginner', duration: '30 min' }]);
    fetchLabs(selectedModuleId);
  };

  if (!authMounted) return null;
  if (role !== "admin") return <div className="p-12 text-center">Access Denied</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Labs</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add Lab</button>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Module:</label>
        <select
          className="border p-2 rounded text-black"
          value={selectedModuleId}
          onChange={e => setSelectedModuleId(e.target.value)}
        >
          {modules.map(m => (
            <option key={m.id} value={m.id}>{m.title}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Title</th>
              <th className="py-2">Difficulty</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {labs.map(lab => (
              <tr key={lab.id} className="border-b">
                <td className="py-2">{lab.title}</td>
                <td className="py-2">{lab.difficulty}</td>
                <td className="py-2">{lab.published ? 'Published' : 'Draft'}</td>
                <td className="py-2 flex gap-2">
                  <button onClick={() => handleTogglePublish(lab.id, lab.published)} className="text-sm bg-gray-200 px-2 py-1 rounded text-black">
                    {lab.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => handleDelete(lab.id)} className="text-sm bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {labs.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">No labs found for this module.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
