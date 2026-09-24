'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function WorkoutDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const resolvedParams = await params;
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${resolvedParams.id}`);
        const data = await res.json();
        
        if (!data || data.error) {
          setError(true);
        } else {
          setWorkout(data);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [params]);

  const handleAddToPlan = () => {
    if (!workout) return;
    const existingPlan = JSON.parse(localStorage.getItem('fitlog_plan') || '[]');
    const isAlreadyAdded = existingPlan.some((item: any) => item.id === workout.id);
    
    if (isAlreadyAdded) {
      toast.warn("Already in your plan", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    const updatedPlan = [...existingPlan, workout];
    localStorage.setItem('fitlog_plan', JSON.stringify(updatedPlan));
    window.dispatchEvent(new Event('fitlog_storage_updated'));

    toast.success("Added to today's plan", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  const handleSaveForLater = () => {
    if (!workout) return;
    const existingSaved = JSON.parse(localStorage.getItem('fitlog_saved') || '[]');
    const isAlreadySaved = existingSaved.some((item: any) => item.id === workout.id);
    
    if (isAlreadySaved) {
      toast.warn("Already saved for later", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    const updatedSaved = [...existingSaved, workout];
    localStorage.setItem('fitlog_saved', JSON.stringify(updatedSaved));
    window.dispatchEvent(new Event('fitlog_storage_updated'));

    toast.success("Saved for later", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0d0b] flex items-center justify-center text-white">
        <p className="text-lime-400 font-bold">Loading...</p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="min-h-screen bg-[#0a0d0b] flex flex-col items-center justify-center p-6 text-white">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Workout Not Found!
        </h1>
        <Link
          href="/"
          className="px-4 py-2 bg-lime-400 text-black font-extrabold rounded-lg text-xs uppercase"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0d0b] text-white flex flex-col justify-between">
      <div className="px-5 sm:px-8 lg:px-12 xl:px-16 py-8 md:py-12 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#89938c] hover:text-white transition-colors bg-[#111612] border border-[#29312c] px-4 py-2 rounded-lg"
          >
            <span>←</span> Back to Workouts
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#111612] border border-[#29312c] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="lg:col-span-5 w-full h-87.5 sm:h-105 rounded-xl overflow-hidden bg-[#080a09] border border-[#29312c]">
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
                {workout.name}
              </h1>

              <p className="text-[#9ca69f] text-sm md:text-base leading-relaxed mb-6">
                {workout.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {workout.muscleGroups?.map((muscle: string, index: number) => (
                  <span
                    key={index}
                    className="bg-lime-400 text-black text-xs font-extrabold px-3 py-1 rounded uppercase tracking-wider"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <div className="divide-y divide-[#29312c] border-y border-[#29312c] mb-8 text-xs sm:text-sm">
                <div className="flex justify-between py-3 text-[#89938c]">
                  <span>EQUIPMENT</span>
                  <span className="text-white font-medium">
                    {workout.equipment}
                  </span>
                </div>
                <div className="flex justify-between py-3 text-[#89938c]">
                  <span>DIFFICULTY</span>
                  <span className="text-white font-medium">
                    {workout.difficulty}
                  </span>
                </div>
                <div className="flex justify-between py-3 text-[#89938c]">
                  <span>SETS</span>
                  <span className="text-white font-medium">
                    {workout.sets || 4}
                  </span>
                </div>
                <div className="flex justify-between py-3 text-[#89938c]">
                  <span>REPS</span>
                  <span className="text-white font-medium">
                    {workout.reps || "6-8"}
                  </span>
                </div>
                <div className="flex justify-between py-3 text-[#89938c]">
                  <span>DURATION</span>
                  <span className="text-white font-medium">
                    {workout.duration} min
                  </span>
                </div>
                <div className="flex justify-between py-3 text-[#89938c]">
                  <span>CALORIES</span>
                  <span className="text-white font-medium">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>
                <div className="flex justify-between py-3 text-[#89938c]">
                  <span>RATING</span>
                  <span className="text-white font-medium">
                    ⭐ {workout.rating}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-white mb-4">
                  INSTRUCTIONS
                </h3>
                <ol className="space-y-2.5 text-xs sm:text-sm text-[#9ca69f]">
                  {workout.instructions?.map((step: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-lime-400 font-bold">
                        {index + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#29312c]">
              <button 
                onClick={handleAddToPlan}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 bg-lime-400 text-black font-extrabold text-xs px-6 py-3.5 rounded-lg hover:bg-lime-300 transition duration-200 uppercase tracking-wider shadow-md cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <line x1="10" x2="14" y1="14" y2="14" />
                  <line x1="12" x2="12" y1="12" y2="16" />
                </svg>
                <span>Add to today's plan</span>
              </button>
              <button 
                onClick={handleSaveForLater}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#29312c] text-white font-bold text-xs px-6 py-3.5 rounded-lg hover:border-lime-400 transition duration-200 uppercase tracking-wider cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span>Save for later</span>
              </button>
            </div>
          </div>
        </div>
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