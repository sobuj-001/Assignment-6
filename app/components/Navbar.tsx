import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
      <Link href="/" className="flex items-center gap-2.5">
        <img
          src="/images/logo.png"
          alt="FITLOG"
          className="h-8 w-8 object-contain"
        />
        <span className="text-xl font-extrabold tracking-wider text-white">
          FITLOG
        </span>
      </Link>

      <div className="flex items-center bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
        <Link
          href="/"
          className="bg-lime-400 text-black font-semibold text-sm px-4 py-1.5 rounded-full transition-all"
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className="text-gray-400 hover:text-white font-medium text-sm px-4 py-1.5 transition-colors"
        >
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Plan</span>
          <span className="bg-lime-400 text-black font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
            0
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Saved</span>
          <span className="bg-gray-900 text-gray-300 border border-gray-700 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
            0
          </span>
        </div>
      </div>
    </nav>
  );
}
