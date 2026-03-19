import React, { useEffect, useState, useMemo } from 'react';
import IdeaForm from '../components/IdeaForm';
import IdeaCard from '../components/IdeaCard';
import EmptyState from '../components/EmptyState';
import { fetchIdeas, createIdea, voteIdea } from '../api/ideasApi';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchIdeas({ sortBy });
      setIdeas(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [sortBy]);

  const handleCreate = async (payload) => {
    const newIdea = await createIdea(payload);
    setIdeas(prev => [newIdea, ...prev]);
  };

  const handleVote = async (id, delta=1) => {
    try {
      const updated = await voteIdea(id, delta);
      setIdeas(prev => prev.map(i => (i._id === updated._id ? updated : i)));
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return ideas;
    const rx = new RegExp(q, 'i');
    return ideas.filter(i => rx.test(i.title) || rx.test(i.description) || (i.tags||[]).some(t => rx.test(t)));
  }, [ideas, query]);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Compose */}
        <div className="lg:col-span-1">
          <IdeaForm onCreate={handleCreate} />
          <div className="mt-4 glass p-4 thin-border rounded-lg">
            <h4 className="text-sm font-medium text-gray-200">Filters</h4>
            <div className="mt-3 flex gap-2">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search ideas or tags" className="w-full bg-transparent border rounded-md px-3 py-2 text-sm outline-none thin-border" />
            </div>
            <div className="mt-3 flex gap-2">
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="bg-transparent thin-border rounded-md px-3 py-2 text-sm">
                <option value="-createdAt">Newest</option>
                <option value="-votes">Top voted</option>
              </select>
              <button onClick={load} className="px-3 py-2 rounded-md glass button-press">Refresh</button>
            </div>
          </div>
        </div>

        {/* Right: List */}
        <div className="lg:col-span-2">
          <div className="glass rounded-lg p-4 thin-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Ideas</h2>
              <p className="text-sm text-gray-400">{filtered.length} results</p>
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-400">Loading ideas…</div>
            ) : filtered.length === 0 ? (
              <EmptyState onCreate={() => {}} />
            ) : (
              <div className="grid gap-4">
                {filtered.map(idea => (
                  <IdeaCard key={idea._id} idea={idea} onVote={handleVote} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
