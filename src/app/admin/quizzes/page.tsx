"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { DbModule } from "@/types/supabase-modules";
import { DbQuiz } from "@/types/supabase-modules";

export default function AdminQuizzesPage() {
  const { role, authMounted } = useAuth();
  const [modules, setModules] = useState<DbModule[]>([]);
  const [quizzes, setQuizzes] = useState<DbQuiz[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    if (selectedModuleId) {
      fetchQuizzes(selectedModuleId);

      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('action') === 'add') {
        handleAddFor(selectedModuleId);
        window.history.replaceState({}, '', window.location.pathname + "?moduleId=" + selectedModuleId);
      }
    } else {
      setQuizzes([]);
    }
  }, [selectedModuleId]);

  async function fetchModules() {
    const { data } = await supabase.from('modules').select('*').order('title');
    if (data) {
      setModules(data);

      const urlParams = new URLSearchParams(window.location.search);
      const moduleIdParam = urlParams.get('moduleId');

      if (moduleIdParam && data.some(m => m.id === moduleIdParam)) {
        setSelectedModuleId(moduleIdParam);
      } else if (data.length > 0 && !selectedModuleId) {
        setSelectedModuleId(data[0].id);
      }
    }
    setLoading(false);
  };


  async function fetchQuizzes(moduleId: string) {
    setLoading(true);
    const selectedMod = modules.find(m => m.id === moduleId);
    if (!selectedMod) {
      setLoading(false);
      return;
    }
    const { data } = await supabase.from('quizzes').select('*').eq('module_slug', selectedMod.slug);
    if (data) setQuizzes(data);
    setLoading(false);
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await supabase.from('quizzes').update({ published: !current }).eq('id', id);
    fetchQuizzes(selectedModuleId);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      await supabase.from('quizzes').delete().eq('id', id);
      fetchQuizzes(selectedModuleId);
    }
  };

  const handleAddFor = async (moduleId: string) => {
    const title = window.prompt('Enter quiz title:');
    if (!title) return;
    const selectedMod = modules.find(m => m.id === moduleId);
    if (!selectedMod) return;
    await supabase.from('quizzes').insert([{ title, module_slug: selectedMod.slug }]);
    fetchQuizzes(moduleId);
  };

  const handleAdd = async () => {
    if (!selectedModuleId) return alert('Select a module first');
    await handleAddFor(selectedModuleId);
  };

  if (!authMounted) return null;
  if (role !== "admin") return <div className="p-12 text-center">Access Denied</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Quizzes</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add Quiz</button>
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
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map(q => (
              <tr key={q.id} className="border-b">
                <td className="py-2">{q.title}</td>
                <td className="py-2">{q.published ? 'Published' : 'Draft'}</td>
                <td className="py-2 flex gap-2">
                  <button onClick={() => handleTogglePublish(q.id, q.published)} className="text-sm bg-gray-200 px-2 py-1 rounded text-black">
                    {q.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => handleDelete(q.id)} className="text-sm bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {quizzes.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">No quizzes found for this module.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
