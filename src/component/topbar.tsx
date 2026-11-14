
import { Search, Bell, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";

function Topbar() {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/projects": "Projects",
    "/mytasks": "My Tasks",
    "/team": "Team",
    "/settings": "Settings",
    "/kanban": "Kanban Board",
  };

  const pageTitle = pageTitles[location.pathname] || "DevTrack";

  return (
    <header className="flex items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-4 sm:px-6 
    dark:border-gray-700 dark:bg-gray-800">

      {/* Page title */}
      <h1 className="ml-12 truncate text-lg font-bold text-slate-800 sm:ml-0 sm:text-2xl dark:text-white">
        {pageTitle}
      </h1>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-5">

        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-2 sm:px-3 dark:bg-gray-700">
          <Search size={18} className="shrink-0 text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="w-16 bg-transparent text-xs outline-none sm:w-36 sm:text-sm dark:text-white dark:placeholder-gray-300"
          />
        </div>

        {/* Notification */}
        <button className="text-slate-600 hover:text-indigo-600 dark:text-gray-300">
          <Bell size={20} />
        </button>

        {/* Profile */}
        <button className="flex items-center justify-center rounded-full bg-indigo-100 p-2 text-indigo-700">
          <UserRound size={20} />
        </button>

      </div>
    </header>
  );
}

export default Topbar;

