import React from 'react';

export default function IdeaCard({ idea, onVote }) {
  const { _id, title, description, tags = [], votes = 0, status } = idea;

  const statusColor = {
    'Submitted': 'bg-white/6 text-gray-200',
    'In Review': 'bg-yellow-600/20 text-yellow-300',
    'Approved': 'bg-green-700/20 text-green-300',
    'Rejected': 'bg-red-700/20 text-red-300'
  }[status] || 'bg-white/6 text-gray-200';

  return (
    <article className="glass p-4 rounded-lg thin-border flex flex-col sm:flex-row gap-4 items-start">
      <div className="w-full sm:w-auto flex items-center gap-3">
        <div className="bg-white/6 w-14 h-14 rounded-lg flex flex-col items-center justify-center thin-border">
          <button onClick={()=>onVote(_id, 1)} className="text-sm font-semibold">▲</button>
          <div className="text-xs mt-1">{votes}</div>
          <button onClick={()=>onVote(_id, -1)} className="text-sm font-semibold mt-1">▼</button>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-md font-semibold">{title}</h3>
            <p className="text-sm text-gray-300 mt-1 line-clamp-3">{description}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>{status}</span>
            <button className="text-xs text-gray-400">Share</button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="tag-chip px-2 py-1 rounded-md text-xs text-gray-200">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
