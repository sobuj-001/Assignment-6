import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-8 py-8">
      <section className="max-w-7xl mx-auto min-h-112 rounded-2xl border border-gray-800 bg-gray-900 px-8 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-2/3">
          <span className="text-lime-400 font-bold tracking-widest text-xs uppercase">
            WORKOUT LIBRARY
          </span>

          <h1 className="mt-5 text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            TRAIN WITH INTENT. LOG <br />
            EVERY SET.
          </h1>

          <p className="mt-6 text-gray-400 text-sm md:text-base max-w-lg leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <div className="mt-7">
            <Link
              href="/workouts"
              className="inline-block bg-lime-400 text-black font-bold text-xs px-6 py-3 rounded-md hover:bg-lime-300 transition uppercase tracking-wide"
            >
              Browse Workouts
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex justify-center items-center">
          <div className="w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            <img
              src="/images/hero-gym.png"
              alt="Workout Machine"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}