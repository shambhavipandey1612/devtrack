
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/applayout";
import Dashboard from "./component/dashboard";

type Project = {
  id: number;
  name: string;
  description: string;
  status: "In Progress" | "Completed" | "On Hold";
};

function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Portfolio Website",
      description: "Personal portfolio built with React.",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Weather Application",
      description: "Weather updates using an API.",
      status: "Completed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] =
    useState<Project["status"]>("In Progress");
  const [searchTerm,setsearchTerm]=useState("");
  const[statusfilter,setStatusfilter]=useState("All");
  const[sortOrder,setSortOrder]=useState("A-Z");
  const [editingProjectId, setEditingProjectId] =
    useState<number | null>(null);

  // Reset form
  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setStatus("In Progress");
    setEditingProjectId(null);
    setShowForm(false);
  };

  // Add or Update Project
  const handleAddProject = () => {
    if (!projectName.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (editingProjectId !== null) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editingProjectId
            ? {
                ...project,
                name: projectName,
                description: description,
                status: status,
              }
            : project
        )
      );
    } else {
      const newProject: Project = {
        id: Date.now(),
        name: projectName,
        description: description,
        status: status,
      };

      setProjects((prevProjects) => [
        ...prevProjects,
        newProject,
      ]);
    }

    resetForm();
  };

  // Edit Project
  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectName(project.name);
    setDescription(project.description);
    setStatus(project.status);
    setShowForm(true);
  };

  // Delete Project
  const handleDeleteProject = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmDelete) {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    }
  };
  const filteredProjects= projects.filter((project)=>{
    const matchesSearch=project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus=statusfilter==="All"||project.status===statusfilter;
    return matchesSearch && matchesStatus;
  });
  const sortedProject=[...filteredProjects].sort((a,b)=>{
    if(sortOrder==="A-Z"){
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            All Projects
          </h2>
          <p className="mt-1 text-slate-500">
            Manage your development projects.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          + New Project
        </button>
      </div>
      {/*search projects*/}
      <div className="mb-6">
        <input type="text" placeholder="search projects..." value={searchTerm}
        onChange={(e)=>
          setsearchTerm(e.target.value)}className="w-full rounded-lg border
          border-slate-300 bg-white px-4 py-3 outline-none
          focus:border-indigo-500"/>
      </div>
      <div className="mb-6">
        <select value={statusfilter}onChange={(e)=>
          setStatusfilter(e.target.value)} className="w-full rounded-lg
          border border-slate-300 bg-white px-4 py-3 outline-none 
          focus:border-indigo-500">
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
      </div>
      <div className="mb-6">
        <select value={sortOrder} onChange={(e)=>
          setSortOrder(e.target.value)}className="w-full rounded-lg border
          border-slate-300 bg-white px-4 py-3 outline-none 
          focus:border-indigo-500">
            <option value="A-Z">Name(A-Z)</option>
             <option value="Z-A">Name(Z-A)</option>
          </select>
      </div>

      {/* Project Form */}
      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold text-slate-800">
            {editingProjectId !== null
              ? "Edit Project"
              : "Create New Project"}
          </h3>

          <div className="space-y-4">
            {/* Project Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Project Name
              </label>

              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as Project["status"])
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAddProject}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              {editingProjectId !== null
                ? "Update Project"
                : "Add Project"}
            </button>
          </div>
        </div>
      )}

      {/* Project Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sortedProject.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-800">
              {project.name}
            </h3>

            <p className="my-3 text-sm text-slate-500">
              {project.description}
            </p>

            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700">
              {project.status}
            </span>

            {/* Edit and Delete */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEditProject(project)}
                className="rounded-lg bg-indigo-100 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-200"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteProject(project.id)}
                className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600 hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <p className="mt-8 text-center text-slate-500">
          No projects found. Create your first project!
        </p>
      )}
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

