import React from 'react';
import IdeasPage from './pages/IdeasPage';
import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-[#0f172a] to-black text-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IdeasPage />
      </main>
    </div>
  );
}
