
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const storedPlan = localStorage.getItem('fitlog_plan');
      const storedSaved = localStorage.getItem('fitlog_saved');

      if (storedPlan) {
        setPlanCount(JSON.parse(storedPlan).length);
      } else {
        setPlanCount(0);
      }

      if (storedSaved) {
        setSavedCount(JSON.parse(storedSaved).length);
      } else {
        setSavedCount(0);
      }
    };

    updateCounts();

    window.addEventListener('storage', updateCounts);
    window.addEventListener('fitlog_storage_updated', updateCounts);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('fitlog_storage_updated', updateCounts);
    };
  }, []);

  const isWorkoutsActive = pathname === '/';
  const isMyPlanActive = pathname.startsWith('/my-plan');

  return (
    <nav className="sticky top-0 z-50 bg-[#0c100e]/95 backdrop-blur-md text-white px-6 py-4 flex items-center justify-between border-b border-[#29312c]">
      <Link className="flex items-center gap-2.5" href="/">
        <img
          src="/images/logo.png"
          alt="FITLOG"
          className="h-8 w-8 object-contain"
        />
        <span className="text-xl font-extrabold tracking-wider text-white">
          FITLOG
        </span>
      </Link>

      <div className="flex items-center bg-[#111612] p-1 rounded-full border border-[#29312c]">
        <Link 
          className={`font-semibold text-sm px-5 py-1.5 rounded-full transition-all ${
            isWorkoutsActive 
              ? 'bg-lime-400 text-black shadow-md' 
              : 'text-gray-400 hover:text-white'
          }`} 
          href="/"
        >
          Workouts
        </Link>
        <Link 
          className={`font-medium text-sm px-5 py-1.5 rounded-full transition-colors ${
            isMyPlanActive 
              ? 'bg-lime-400 text-black shadow-md font-semibold' 
              : 'text-gray-400 hover:text-white'
          }`} 
          href="/my-plan"
        >
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <Link className="flex items-center gap-2 hover:opacity-80 transition" href="/my-plan?tab=today">
          <span className="text-gray-400">Plan</span>
          <span className="bg-lime-400 text-black font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
            {planCount}
          </span>
        </Link>
        <Link className="flex items-center gap-2 hover:opacity-80 transition" href="/my-plan?tab=saved">
          <span className="text-gray-400">Saved</span>
          <span className="bg-[#111612] text-gray-300 border border-[#29312c] font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
            {savedCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}