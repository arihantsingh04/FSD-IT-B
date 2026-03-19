import React from 'react';

export default function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl glass flex items-center justify-center glow">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="opacity-90">
              <path d="M12 2v10" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="4" stroke="white" strokeWidth="1.2" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Idea Portal</h1>
            <p className="text-xs text-gray-400">Collect, discuss & vote on ideas</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="glass px-3 py-2 rounded-md thin-border text-sm">Explore</button>
          <button className="bg-white/6 hover:bg-white/8 px-3 py-2 rounded-md text-sm thin-border">Sign in</button>
        </div>
      </div>
    </header>
  );
}
