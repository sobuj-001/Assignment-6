import Link from "next/link";

interface Workout {
  id: string;
  name: string;
  image: string;
  description: string;
  difficulty: string;
  muscleGroups: string[];
  duration: number;
  caloriesBurned: number;
  rating: number;
}

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  const workoutOrder = [
    "Barbell Bench Press",
    "Pull-Up",
    "Barbell Squat",
    "Overhead Press",
    "Dumbbell Bicep Curl",
    "Dumbbell Bicep Curl",
    "Hollow-Body Plank",
    "Dumbbell Bicep Curl",
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
          workout.name.toLowerCase().trim() === name.toLowerCase().trim()
      );

      if (index === -1) {
        return null;
      }

      return remainingWorkouts.splice(index, 1)[0];
    })
    .filter((workout): workout is Workout => workout !== null);

  return (
    <main className="min-h-screen bg-[#0b0c0f] text-white px-8 md:px-16 py-10 space-y-12">
      <section className="w-full min-h-112 rounded-2xl border border-[#222630] bg-[#15171d] px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-[65%]">
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

        <div className="w-full md:w-[35%] flex justify-center items-center">
          <div className="w-70 h-70 md:w-82.5 md:h-82.5 flex items-center justify-center">
            <img
              src="/images/hero-gym.png"
              alt="Workout Machine"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="w-full space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            THE LIBRARY
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Explore professional workouts, track your fitness, and build your
            routine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <Link
              href={`/workouts/${workout.id}`}
              key={workout.id}
              className="bg-[#15171d] rounded-2xl overflow-hidden border border-[#222630] flex flex-col justify-between hover:border-lime-400/50 transition duration-300 p-6"
            >
              <div>
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-black mb-4 flex items-center justify-center">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover object-center"
                  />

                  <span className="absolute top-3 right-3 bg-lime-400 text-black text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                    {workout.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
                  {workout.name}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {workout.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {workout.muscleGroups?.map(
                    (muscle: string, index: number) => (
                      <span
                        key={index}
                        className="bg-[#222630] text-gray-300 text-xs px-2.5 py-1 rounded-md font-medium"
                      >
                        {muscle}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#222630] flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>⏱️ {workout.duration} mins</span>
                <span>🔥 {workout.caloriesBurned} kcal</span>
                <span className="text-lime-400">⭐ {workout.rating}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

