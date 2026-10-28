
import { LayoutDashboard, FolderKanban, CheckSquare, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 p-5 text-white">
      <h1 className="mb-10 text-2xl font-bold">
        Dev<span className="text-indigo-400">Track</span>
      </h1>

      <nav className="flex flex-col gap-3">
        
<NavLink
  to="/"
  end
  className={({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`
  }
>
  <LayoutDashboard size={20} />
  Dashboard
</NavLink>
        
<NavLink
  to="/projects"
  className={({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`
  }
>
  <FolderKanban size={20} />
  Projects
</NavLink>
        <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800">
          <CheckSquare size={20} />
          My Tasks
        </a>

        <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800">
          <Users size={20} />
          Team
        </a>

        <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800">
          <Settings size={20} />
          Settings
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
