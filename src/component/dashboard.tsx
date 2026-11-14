import { useProjects } from "../context/projectcontext";
import { useTasks } from "../context/taskcontext";
function getprogress(status:"In Progress"|"Completed"|"On Hold") {
  if(status==="Completed"){
    return 100;
  }
  if(status==="In Progress"){
    return 50;
  }
  return 0;
}


function Dashboard() {
  const { projects }= useProjects();
  const  {tasks }= useTasks();
  const activeTasks= tasks.filter((task)=>task.status==="In Progress").length;
  const CompletedTasks = tasks.filter((task)=>task.status==="Done").length;
   const totalTasks= tasks.length;
      const completionRate= totalTasks===0?0:
      Math.round((CompletedTasks/totalTasks)*100);
      const recentTasks = [...tasks].sort((a,b)=>b.id-a.id).slice(0,5);



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
          <h3 className="mt-2 text-3xl font-bold text-indigo-600">{projects.length}</h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Active Tasks</p>
          <h3 className="mt-2 text-3xl font-bold text-emerald-600">{activeTasks}</h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Completed Tasks</p>
          <h3 className="mt-2 text-3xl font-bold text-amber-600">{CompletedTasks}</h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Task Completion</p>
           <h3 className="mt-2 text-3xl font-bold text-amber-600">{completionRate}%</h3>
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
          {projects.map((project) => {
            const progress=getprogress(project.status);
           return ( 
           <div key={project.id}
              className="rounded-lg border border-slate-200 p-4">
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
                    {progress}%
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
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
           );
})}
          {projects.length===0 && (<p className="py-6 text-center text-sm text-slate-500">
            No projects yet.Add your first project to get started!
          </p>)}
        </div>
      </section>


   {/* Recent Activity */}
<section className="rounded-xl bg-white p-6 shadow-sm">
  <div className="mb-5">
    <h3 className="text-lg font-semibold text-slate-800">
      Recent Activity
    </h3>
    <p className="mt-1 text-sm text-slate-500">
      Your latest task updates.
    </p>
  </div>

  <div className="space-y-4">
    {recentTasks.map((task) => (
      <div
        key={task.id}
        className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center"
      >
        <div>
          <h4 className="font-medium text-slate-800">
            {task.title}
          </h4>

         <p className="mt-1 text-sm">
  Priority:{" "}
  <span
    className={`font-medium ${
      task.priority === "High"
        ? "text-red-600": task.priority === "Medium"
        ? "text-amber-600": "text-emerald-600"
    }`}>{task.priority}</span></p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
  className={`rounded-full px-3 py-1 text-xs font-medium ${
    task.status === "Done"
      ? "bg-emerald-50 text-emerald-600": task.status === "In Progress"
      ? "bg-blue-50 text-blue-600": "bg-amber-50 text-amber-600"
  }`}>{task.status}</span>

          {task.dueDate && (
            <span className="text-sm text-slate-500">
              Due: {task.dueDate}
            </span>
          )}
        </div>
      </div>
    ))}

    {recentTasks.length === 0 && (
      <p className="py-6 text-center text-sm text-slate-500">
        No recent activity yet. Add your first task!
      </p>
    )}
  </div>
</section>   
    </div>
  );
}

export default Dashboard;
