
import { Search, Bell, UserRound } from "lucide-react";

function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-slate-800">
        Dashboard
      </h1>

      {/* Right side: Search and profile */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-36 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Notification icon */}
        <button className="text-slate-600 hover:text-indigo-600">
          <Bell size={21} />
        </button>

        {/* User profile icon */}
        <button className="flex items-center justify-center rounded-full bg-indigo-100 p-2 text-indigo-700">
          <UserRound size={21} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
