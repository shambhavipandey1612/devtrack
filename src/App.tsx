import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/applayout";
import Dashboard from "./component/dashboard";

function Projects() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">
        Projects
      </h2>

      <p className="mt-2 text-slate-500">
        View and manage all your development projects here.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

