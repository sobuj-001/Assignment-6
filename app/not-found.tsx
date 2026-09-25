'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="bg-[#111612] border border-[#29312c] rounded-2xl py-16 px-8 max-w-lg w-full flex flex-col items-center shadow-2xl">
        <h1 className="text-6xl font-black text-lime-400 mb-4">404</h1>
        <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-white">
          PAGE NOT FOUND
        </h2>
        <p className="text-[#89938c] text-sm mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-lime-400 text-black font-extrabold text-xs px-6 py-3.5 rounded-lg hover:bg-lime-300 transition uppercase tracking-wider shadow-md"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}