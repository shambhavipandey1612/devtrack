
import { LayoutDashboard, FolderKanban, CheckSquare, Users, Settings ,KanbanSquare } from "lucide-react";
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
<NavLink to="/kanban"className={({ isActive }) =>`flex items-center gap-3 rounded-lg px-4 py-3 
transition-colors ${
      isActive
        ? "bg-indigo-600 text-white": "text-slate-300 hover:bg-slate-800"
    }`
  }
>
  <KanbanSquare size={20} />
  <span>Kanban Board</span>
</NavLink>

<NavLink to="/mytasks" className={({ isActive }) =>`flex items-center gap-3 rounded-lg px-4 py-3 ${
      isActive ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800" }`
  }
>
  <CheckSquare size={20} />
  My Tasks
</NavLink>

<NavLink to="/team" className={({ isActive })=>`flex items-center gap-3 rounded-lg px-3 py-2 ${
          isActive ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800" }`
        }>
          <Users size={20} />
          Team
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
      isActive? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"}`
      }>
      <Settings size={20} />
      <span>Settings</span>
      </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
