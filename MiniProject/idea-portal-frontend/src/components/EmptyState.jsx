import React from 'react';

export default function EmptyState() {
  return (
    <div className="py-12 text-center text-gray-400">
      <div className="mx-auto w-48 h-48 glass rounded-xl flex items-center justify-center thin-border mb-6">
        <div>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto opacity-80">
            <path d="M12 2v10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="4" stroke="white" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-200">No ideas yet</h3>
      <p className="mt-2 text-sm">Be the first to share something useful.</p>
    </div>
  );
}
