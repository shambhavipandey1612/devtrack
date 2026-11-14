

import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
  KanbanSquare,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white md:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex min-h-screen w-64 flex-col bg-slate-900 p-5 text-white transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Dev<span className="text-indigo-400">Track</span>
          </h1>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <NavLink to="/" end className={navLinkClass} onClick={() => setIsOpen(false)}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/projects" className={navLinkClass} onClick={() => setIsOpen(false)}>
            <FolderKanban size={20} />
            Projects
          </NavLink>

          <NavLink to="/kanban" className={navLinkClass} onClick={() => setIsOpen(false)}>
            <KanbanSquare size={20} />
            Kanban Board
          </NavLink>

          <NavLink to="/mytasks" className={navLinkClass} onClick={() => setIsOpen(false)}>
            <CheckSquare size={20} />
            My Tasks
          </NavLink>

          <NavLink to="/team" className={navLinkClass} onClick={() => setIsOpen(false)}>
            <Users size={20} />
            Team
          </NavLink>

          <NavLink to="/settings" className={navLinkClass} onClick={() => setIsOpen(false)}>
            <Settings size={20} />
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
