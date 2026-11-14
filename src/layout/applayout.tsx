

import Sidebar from "../component/sidebar";
import Topbar from "../component/topbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-gray-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="min-w-0 flex-1 bg-slate-100 p-4 transition-colors duration-300 sm:p-6 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
