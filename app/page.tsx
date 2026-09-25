'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

interface Workout {
  id: string;
  name: string;
  image: string;
  description: string;
  difficulty: string;
  equipment: string;
  muscleGroups: string[];
  duration: number;
  caloriesBurned: number;
  rating: number;
}

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch workouts", err);
        setLoading(false);
      });
  }, []);

  const workoutOrder = [
    "Barbell Bench Press",
    "Pull-Up",
    "Back Squat",
    "Overhead Press",
    "Dumbbell Bicep Curl",
    "Burpee",
    "Hollow-Body Plank",
    "Kettlebell Swing",
    "Conventional Deadlift",
    "Push-Up",
    "Walking Lunge",
    "Russian Twist",
  ];

  const remainingWorkouts = [...workouts];

  const sortedWorkouts = workoutOrder
    .map((name) => {
      const index = remainingWorkouts.findIndex(
        (workout) =>
          workout.name.toLowerCase().trim() === name.toLowerCase().trim(),
      );

      if (index === -1) {
        return null;
      }

      return remainingWorkouts.splice(index, 1)[0];
    })
    .filter((workout): workout is Workout => workout !== null);

  const filteredWorkouts = sortedWorkouts.filter((workout) => {
    const matchesName = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = workout.muscleGroups?.some((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesName || matchesTag;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0d0b] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lime-400 font-extrabold text-xs uppercase tracking-widest">
          Loading workouts…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0d0b] text-white px-5 sm:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
      <section className="w-full min-h-112 rounded-2xl border border-[#29312c] bg-[#111612] px-6 sm:px-8 md:px-12 lg:px-16 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
        <div className="w-full md:w-[60%]">
          <span className="text-lime-400 font-bold tracking-[0.2em] text-xs uppercase">
            WORKOUT LIBRARY
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05]">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="mt-6 text-[#9ca69f] text-sm md:text-base max-w-xl leading-7">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <div className="mt-8">
            <a
              href="#library"
              className="inline-flex items-center justify-center bg-lime-400 text-black font-extrabold text-xs px-7 py-3.5 rounded-lg hover:bg-lime-300 transition duration-200 uppercase tracking-wider shadow-md"
            >
              Browse Workouts
            </a>
          </div>
        </div>

        <div className="w-full md:w-[40%] flex justify-center items-center">
          <div className="w-70 h-70 md:w-82.5 md:h-82.5 flex items-center justify-center">
            <img
              src="images/hero-gym.png"
              alt="Workout Machine"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      <section id="library" className="w-full mt-14">
        <div className="mb-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 bg-lime-400 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                THE LIBRARY
              </h2>
            </div>
            <p className="text-[#89938c] text-sm mt-2 ml-4">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search by name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111612] border border-[#29312c] text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-lime-400 transition"
            />
          </div>
        </div>

        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-16 bg-[#111612] border border-[#29312c] rounded-2xl">
            <p className="text-[#89938c] text-sm">No workouts found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filteredWorkouts.map((workout) => (
              <Link
                href={`/workouts/${workout.id}`}
                key={workout.id}
                className="group bg-[#111612] rounded-2xl overflow-hidden border border-[#29312c] flex flex-col justify-between hover:border-lime-400/60 transition-all duration-300 p-5 shadow-md"
              >
                <div>
                  <div className="relative h-48 w-full rounded-xl overflow-hidden bg-[#080a09] mb-4 flex items-center justify-center">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {workout.muscleGroups?.map(
                      (muscle: string, index: number) => (
                        <span
                          key={index}
                          className="bg-lime-400 text-black text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider"
                        >
                          {muscle}
                        </span>
                      ),
                    )}
                  </div>

                  <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-tight text-white mb-1 group-hover:text-lime-400 transition-colors duration-200">
                    {workout.name}
                  </h3>

                  <p className="text-[#89938c] text-xs md:text-sm mb-5">
                    {workout.equipment}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#29312c] flex items-center justify-between text-xs text-[#89938c] font-semibold">
                  <span>⏱ {workout.duration} min</span>
                  <span>🔥 {workout.caloriesBurned} kcal</span>
                  <span className="text-white">⭐ {workout.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

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