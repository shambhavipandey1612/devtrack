
type Project = {
  id: number;
  name: string;
  description: string;
  status: "In Progress" | "Completed" | "On Hold";
  progress: number;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "Personal portfolio using React and Tailwind CSS.",
    status: "In Progress",
    progress: 70,
  },
  {
    id: 2,
    name: "Weather Application",
    description: "Weather updates using a public API.",
    status: "Completed",
    progress: 100,
  },
  {
    id: 3,
    name: "Task Management App",
    description: "Organize tasks and track team progress.",
    status: "On Hold",
    progress: 35,
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>
        <p className="mt-1 text-slate-500">
          Here's what's happening with your projects.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Projects</p>
          <h3 className="mt-2 text-3xl font-bold text-indigo-600">12</h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Active Tasks</p>
          <h3 className="mt-2 text-3xl font-bold text-emerald-600">08</h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Completed Tasks</p>
          <h3 className="mt-2 text-3xl font-bold text-amber-600">24</h3>
        </div>
      </div>

      {/* Recent projects */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-800">
            Recent Projects
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Track your projects and their progress.
          </p>
        </div>

        <div className="space-y-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {project.name}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {project.description}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                    project.status === "Completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : project.status === "In Progress"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-medium text-slate-700">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      project.status === "Completed"
                        ? "bg-emerald-500"
                        : project.status === "In Progress"
                          ? "bg-indigo-500"
                          : "bg-amber-500"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
