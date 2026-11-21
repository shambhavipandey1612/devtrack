
import { Search, Bell, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Topbar() {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile, setProfile] = useState(() => {
  const savedProfile = localStorage.getItem("userProfile");

  return savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: "Shambhavi",
        email: "",
        role: "Developer",
      };
});

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
        <div className="relative">
        <button  onClick={() => setIsProfileOpen(!isProfileOpen)}
         className="flex items-center justify-center rounded-full bg-indigo-100 p-2 text-indigo-700
         hover:bg-indigo-200"><UserRound size={20} />
        </button>
        {isProfileOpen && (
          <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-slate-200 bg-white p-2 
          shadow-lg dark:border-gray-700 dark:bg-gray-800">
         <div className="px-3 py-2">
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">{profile.name}</p>

  <p className="truncate text-xs text-slate-500 dark:text-gray-400">
    {profile.email}
  </p>

  <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
    {profile.role}
  </p>
</div>   
        <div className="my-1 border-t border-slate-200 dark:border-gray-700" />

      <button onClick={() => {
          window.location.href = "/settings";
          setIsProfileOpen(false);
        }}
        className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-gray-200 
        dark:hover:bg-gray-700">
        My Profile
      </button>

      <button onClick={() => {
          window.location.href = "/settings";
          setIsProfileOpen(false);
        }}
        className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-gray-200 
        dark:hover:bg-gray-700">
        Settings
      </button>

      <div className="my-1 border-t border-slate-200 dark:border-gray-700" />

      <button onClick={() => setIsProfileOpen(false)}
        className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700">
        Logout (Demo)
      </button>
    </div>
        
        )}
        </div>

      </div>
    </header>
  );
}

export default Topbar;

