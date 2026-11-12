
import Sidebar from "../component/sidebar";
import Topbar from "../component/topbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900 transitions-colors duration-300">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-6 bg-slate-100 dark:bg-gray-900 transitions-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

