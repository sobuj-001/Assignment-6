'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

function MyPlanContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [planWorkouts, setPlanWorkouts] = useState<any[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<any[]>([]);

  useEffect(() => {
    if (tabParam === 'saved') {
      setActiveTab('saved');
    } else {
      setActiveTab('today');
    }
  }, [tabParam]);

  const loadData = () => {
    const storedPlan = localStorage.getItem('fitlog_plan');
    if (storedPlan) {
      setPlanWorkouts(JSON.parse(storedPlan));
    } else {
      setPlanWorkouts([]);
    }

    const storedSaved = localStorage.getItem('fitlog_saved');
    if (storedSaved) {
      setSavedWorkouts(JSON.parse(storedSaved));
    } else {
      setSavedWorkouts([]);
    }
  };

  useEffect(() => {
    loadData();

    window.addEventListener('storage', loadData);
    window.addEventListener('fitlog_storage_updated', loadData);

    return () => {
      window.removeEventListener('storage', loadData);
      window.removeEventListener('fitlog_storage_updated', loadData);
    };
  }, []);

  const handleRemoveFromPlan = (id: string) => {
    const updated = planWorkouts.filter((item) => item.id !== id);
    setPlanWorkouts(updated);
    localStorage.setItem('fitlog_plan', JSON.stringify(updated));
    window.dispatchEvent(new Event('fitlog_storage_updated'));

    toast.info("Removed from today's plan", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  const handleRemoveFromSaved = (id: string) => {
    const updated = savedWorkouts.filter((item) => item.id !== id);
    setSavedWorkouts(updated);
    localStorage.setItem('fitlog_saved', JSON.stringify(updated));
    window.dispatchEvent(new Event('fitlog_storage_updated'));

    toast.info("Removed from saved workouts", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  const currentList = activeTab === 'today' ? planWorkouts : savedWorkouts;

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, curr) => acc + (Number(curr.duration) || Number(curr.time) || 0), 0);
  const totalCalories = currentList.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || Number(curr.calories) || 0), 0);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-between">
      <div className="px-5 sm:px-8 lg:px-16 py-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider mb-2">
            MY PLAN
          </h1>
          <p className="text-[#89938c] text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#111612] border border-[#29312c] rounded-xl p-5">
            <p className="text-[#89938c] text-xs font-semibold uppercase mb-1">Exercises</p>
            <h3 className="text-3xl font-black text-lime-400">{totalExercises}</h3>
          </div>
          <div className="bg-[#111612] border border-[#29312c] rounded-xl p-5">
            <p className="text-[#89938c] text-xs font-semibold uppercase mb-1">Minutes</p>
            <h3 className="text-3xl font-black text-white">{totalMinutes}</h3>
          </div>
          <div className="bg-[#111612] border border-[#29312c] rounded-xl p-5">
            <p className="text-[#89938c] text-xs font-semibold uppercase mb-1">Calories</p>
            <h3 className="text-3xl font-black text-white">{totalCalories}</h3>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#111612] p-2 rounded-xl border border-[#29312c]">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                activeTab === 'today'
                  ? 'bg-black text-white border border-[#29312c]'
                  : 'text-[#89938c] hover:text-white'
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                activeTab === 'saved'
                  ? 'bg-black text-white border border-[#29312c]'
                  : 'text-[#89938c] hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>
        </div>

        {currentList.length === 0 ? (
          <div className="bg-[#111612] border border-[#29312c] rounded-2xl py-20 px-6 text-center flex flex-col items-center justify-center">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-white">
              NOTHING HERE YET
            </h2>
            <p className="text-[#89938c] text-sm mb-6 max-w-md">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="bg-lime-400 text-black font-extrabold text-xs px-6 py-3.5 rounded-lg hover:bg-lime-300 transition uppercase tracking-wider shadow-md"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {currentList.map((workout, index) => (
              <div
                key={workout.id || index}
                className="bg-[#111612] border border-[#29312c] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={workout.image || workout.img || "/images/hero-gym.png"}
                    alt={workout.name || workout.title || "Workout"}
                    className="w-24 h-16 object-cover rounded-lg border border-[#29312c]"
                  />
                  <div>
                    <h3 className="font-extrabold text-sm uppercase text-white tracking-wider mb-1">
                      {workout.name || workout.title || workout.workoutName || "Unnamed Workout"}
                    </h3>
                    <p className="text-[#89938c] text-xs mb-2">
                      {workout.category || workout.equipment || workout.difficulty || workout.type || "General"}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#89938c]">
                      <span>⏱ {workout.duration || workout.time || 0} min</span>
                      <span>🔥 {workout.caloriesBurned || workout.calories || 0} kcal</span>
                      <span>⭐ {workout.rating || "5.0"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="border border-[#29312c] bg-black text-white hover:bg-[#1a211c] text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => {
                      if (activeTab === 'today') {
                        handleRemoveFromPlan(workout.id);
                      } else {
                        handleRemoveFromSaved(workout.id);
                      }
                    }}
                    className="text-[#89938c] hover:text-white px-3 py-2 text-base font-bold rounded-lg border border-[#29312c] bg-black cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <footer className="w-full border-t border-[#29312c] bg-[#0c100e] mt-16 py-6 px-5 sm:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img
            src="/images/logo.png"
            alt="FitLog Logo"
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
            style={{ transform: "rotate(135deg)" }}
          />
          <span className="text-white font-black text-sm tracking-widest uppercase">
            FITLOG
          </span>
        </div>
        <p className="text-[#89938c] text-xs sm:text-sm text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </footer>
    </main>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}