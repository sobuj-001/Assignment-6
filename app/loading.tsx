export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0a0d0b] text-white flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lime-400 font-extrabold text-xs uppercase tracking-widest">
        Loading workouts…
      </p>
    </main>
  );
}