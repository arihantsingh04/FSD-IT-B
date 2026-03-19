import React, { useState } from 'react';

export default function IdeaForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [tags, setTags] = useState('');

  const submit = async (e) => {
    e?.preventDefault();
    if (!title.trim() || !description.trim()) return;
    const payload = {
      title: title.trim(),
      description: description.trim(),
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    await onCreate(payload);
    // reset
    setTitle('');
    setDescription('');
    setCategory('General');
    setTags('');
    // small visual confirmation could be added
  };

  return (
    <form onSubmit={submit} className="glass p-4 rounded-lg thin-border space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Share an idea</h3>
        <span className="text-xs text-gray-400">Be concise</span>
      </div>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Idea title"
        className="w-full bg-transparent outline-none thin-border rounded px-3 py-2 text-sm"
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description — why it matters, how it could work"
        rows={4}
        className="w-full bg-transparent outline-none thin-border rounded px-3 py-2 text-sm resize-none"
      />

      <div className="flex gap-2">
        <select value={category} onChange={e=>setCategory(e.target.value)} className="bg-transparent thin-border rounded px-3 py-2 text-sm">
          <option>General</option>
          <option>Education</option>
          <option>Community</option>
          <option>Sustainability</option>
        </select>

        <input
          value={tags}
          onChange={e=>setTags(e.target.value)}
          placeholder="tags (comma separated)"
          className="flex-1 bg-transparent thin-border rounded px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">Your idea will be visible to the group</div>
        <button type="submit" className="px-4 py-2 rounded-md bg-gradient-to-r from-orange-500/90 to-orange-400/80 text-black font-semibold shadow-sm hover:opacity-95 button-press">
          Submit
        </button>
      </div>
    </form>
  );
}
