"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { DbLecture, DbModule } from "@/types/supabase-modules";

export default function AdminLecturesPage() {
  const { role, authMounted } = useAuth();
  const [modules, setModules] = useState<DbModule[]>([]);
  const [lectures, setLectures] = useState<DbLecture[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    if (selectedModuleId) {
      fetchLectures(selectedModuleId);
    } else {
      setLectures([]);
    }
  }, [selectedModuleId]);

  async function fetchModules() {
    const { data } = await supabase.from('modules').select('*').order('title');
    if (data) {
      setModules(data);
      if (data.length > 0 && !selectedModuleId) setSelectedModuleId(data[0].id);
    }
    setLoading(false);
  };


  async function fetchLectures(moduleId: string) {
    setLoading(true);
    const { data } = await supabase.from('lectures').select('*').eq('module_slug', modules.find(m => m.id === moduleId)?.slug || '');
    if (data) setLectures(data);
    setLoading(false);
  };

  const handleDummyToggle = async (id: string, current: boolean) => {
    console.log('published column not in schema');
    fetchLectures(selectedModuleId);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lecture?')) {
      await supabase.from('lectures').delete().eq('id', id);
      fetchLectures(selectedModuleId);
    }
  };

  const handleAdd = async () => {
    if (!selectedModuleId) return alert('Select a module first');
    const title = prompt('Enter lecture title:');
    if (!title) return;
    await supabase.from('lectures').insert([{ title, module_slug: modules.find(m => m.id === selectedModuleId)?.slug || '', type: 'reading', duration: '10 min' }]);
    fetchLectures(selectedModuleId);
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
      // removed order_index update
    }
  };

  if (!authMounted) return null;
  if (role !== "admin") return <div className="p-12 text-center">Access Denied</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Lectures</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add Lecture</button>
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
              <th className="py-2">Order</th>
              <th className="py-2">Title</th>
              <th className="py-2">Type</th>
              <th className="py-2">Status</th>
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
                <td className="py-2">&apos;Published&apos;</td>
                <td className="py-2 flex gap-2">
                  <button onClick={() => handleDummyToggle(lec.id, lec.published)} className="text-sm bg-gray-200 px-2 py-1 rounded text-black">
                    {'Cannot unpublish'}
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
    </div>
  );
}
