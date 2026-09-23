import Link from 'next/link';

async function getWorkoutDetail(id: string) {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
  const data = await res.json();
  return data;
}

export default async function WorkoutDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const workout = await getWorkoutDetail(id);

  if (!workout || workout.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Workout Not Found!</h1>
        <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Back to Home</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-indigo-600 font-medium mb-6 hover:underline">
          ← Back to Library
        </Link>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <div className="relative h-72 md:h-96 w-full">
            <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
            <span className="absolute top-4 right-4 bg-indigo-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
              {workout.difficulty}
            </span>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{workout.name}</h1>
            <p className="text-gray-600 text-base mb-6 leading-relaxed">{workout.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl mb-8 border border-gray-100">
              <div>
                <span className="block text-xs text-gray-500 uppercase font-semibold">Equipment</span>
                <span className="text-gray-800 font-medium">{workout.equipment}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase font-semibold">Duration</span>
                <span className="text-gray-800 font-medium">{workout.duration} Mins</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase font-semibold">Calories</span>
                <span className="text-gray-800 font-medium">{workout.caloriesBurned} Kcal</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase font-semibold">Sets & Reps</span>
                <span className="text-gray-800 font-medium">{workout.sets} Sets / {workout.reps}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
              <ol className="space-y-3">
                {workout.instructions?.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                    <span className="bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">{workout.instructions[index]}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm text-center">
                Add to Today's Plan 📅
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors text-center">
                Save to List ⭐
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}