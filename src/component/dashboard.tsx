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
    <div className="min-h-screen space-y-6 bg-slate-100 p-4 transition-colors duration-300 sm:p-6 dark:bg-gray-900">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Dashboard
        </h2>
        <p className="mt-1 text-slate-500 dark:text-gray-400">
          Here's what's happening with your projects.
        </p>
      </div>


      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm  transition-all duration-200 
        hover:-translate-y-1 hover:shadow-md dark:bg-gray-800">
          <p className="text-sm text-slate-500 dark:text-gray-400">Total Projects</p>
          <h3 className="mt-2 text-3xl font-bold text-indigo-600">{projects.length}</h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 
        hover:-translate-y-1 hover:shadow-md dark:bg-gray-800">
          <p className="text-sm text-slate-500 dark:text-gray-400">Active Tasks</p>
          <h3 className="mt-2 text-3xl font-bold text-emerald-600">{activeTasks}</h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 
        hover:-translate-y-1 hover:shadow-md dark:bg-gray-800">
          <p className="text-sm text-slate-500 dark:text-gray-400">Completed Tasks</p>
          <h3 className="mt-2 text-3xl font-bold text-amber-600">{CompletedTasks}</h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 
        hover:-translate-y-1 hover:shadow-md dark:bg-gray-800">
          <p className="text-sm text-slate-500 dark:text-gray-400">Task Completion</p>
           <h3 className="mt-2 text-3xl font-bold text-amber-600">{completionRate}%</h3>
          </div> 
      </div>

      {/* Recent projects */}
      <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Recent Projects
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
            Track your projects and their progress.
          </p>
        </div>

        <div className="space-y-5">
          {projects.map((project) => {
            const progress=getprogress(project.status);
           return ( 
           <div key={project.id}
              className="rounded-lg border border-slate-200 p-4 transition-all duration-200
               hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    {project.name}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
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
                  <span className="text-slate-500  dark:text-gray-400">Progress</span>
                  <span className="font-medium text-slate-700 dark:text-gray-200">
                    {progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:text-gray-700">
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
<section className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
  <div className="mb-5">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
      Recent Activity
    </h3>
    <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
      Your latest task updates.
    </p>
  </div>

  <div className="space-y-4">
    {recentTasks.map((task) => (
      <div
        key={task.id}
        className="flex flex-col justify-between gap-3 rounded-lg border-b border-slate-100 px-3 py-3 pb-4 
        transition-colors hover:bg-slate-50 sm:flex-row sm:items-center dark:border-gray-700 
        dark:hover:bg-gray-700/40">
        <div>
          <h4 className="font-medium text-slate-800 dark:text-white">
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
            <span className="text-sm text-slate-500 dark:text-gray-400">
              Due: {task.dueDate}
            </span>
          )}
        </div>
      </div>
    ))}

    {recentTasks.length === 0 && (
      <p className="py-6 text-center text-sm text-slate-500 dark:text-gray-400">
        No recent activity yet. Add your first task!
      </p>
    )}
  </div>
</section>   
    </div>
  );
}

export default Dashboard;
