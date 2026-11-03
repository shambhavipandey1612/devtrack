
import{ useState } from "react";
import { useTasks,type Task } from "../context/taskcontext";

function MyTasks(){
    const{ tasks,setTasks }= useTasks();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
    const [status, setStatus] = useState<"Todo" | "In Progress" | "Done">("Todo");
    const [dueDate, setDueDate] = useState("");
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [searchTerm,setSearchTerm]=useState("");
    const [statusFilter,setStatusFilter]=useState("All");
    const [priorityFilter, setPriorityFilter]= useState("All");
    const [sortOrder,setSortOrder] = useState("Earliest");
    const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   if (!title.trim()) {
    alert("Please enter a task title");
    return;
   }

   if (editingTaskId !== null) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              title: title.trim(),
              description,
              priority,
              status,
              dueDate,
            }
          : task
      )
    );

    setEditingTaskId(null);
  } else {
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description,
      priority,
      status,
      dueDate,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  setTitle("");
  setDescription("");
  setPriority("Medium");
  setStatus("Todo");
  setDueDate("");
};
    const handleDeleteTask = (id: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (confirmDelete) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }
};
const handleEditTask = (task: Task) => {
  setEditingTaskId(task.id);
  setTitle(task.title);
  setDescription(task.description);
  setPriority(task.priority);
  setStatus(task.status);
  setDueDate(task.dueDate);
};

 const filteredTasks= tasks.filter((task)=>{
 const matchesSearch=task.title.toLowerCase().includes(searchTerm.toLowerCase());
 const matchesStatus=statusFilter==="All"|| task.status===statusFilter;
 const matchesPriority= priorityFilter==="All"|| task.priority===priorityFilter;
 return matchesSearch && matchesStatus && matchesPriority;
 });

 const sortedTasks = [...filteredTasks].sort((a, b) => {
  if(!a.dueDate) return 1;
  if(!b.dueDate) return -1;
    if (sortOrder === "Earliest") {
      return a.dueDate.localeCompare(b.dueDate);
    }

    return b.dueDate.localeCompare(a.dueDate);
  });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">My Tasks</h2>
                <p className="mt-1 text-slate-500">Manage your tasks and 
                    track your progress.
                </p>
            </div>
           {/* Add Task Form */}
<section className="rounded-xl bg-white p-6 shadow-sm">
  <h3 className="mb-5 text-lg font-semibold text-slate-800">
    {editingTaskId !== null ? "Edit Task" : "Add New Task"}</h3>

  <form onSubmit={handleAddTask} className="space-y-4">
    {/* Task Title */}
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        Task Title
      </label>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500"
      />
    </div>

    {/* Description */}
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        Description
      </label>
      <textarea
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-indigo-500"
        rows={3}
      />
    </div>

    {/* Priority and Status */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "High" | "Medium" | "Low")
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "Todo" | "In Progress" | "Done")
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>

    {/* Due Date */}
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        Due Date
      </label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2"
      />
    </div>

    <button
      type="submit"
      className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
    >
      {editingTaskId !== null ? "Update Task" : "Add Task"}
    </button>
  </form>
  {editingTaskId !== null && (
  <button
    type="button"
    onClick={() => {
      setEditingTaskId(null);
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setStatus("Todo");
      setDueDate("");
    }}
    className="ml-3 rounded-lg border border-slate-300 px-5 py-2.5 text-slate-600 hover:bg-slate-50"
  >
    Cancel Edit
  </button>
)}
</section> 
{/* Task List */}
<section className="rounded-xl bg-white p-6 shadow-sm">
  <div className="mb-5">
    <h3 className="text-lg font-semibold text-slate-800">
      All Tasks
    </h3>
    <p className="mt-1 text-sm text-slate-500">
      View and manage your tasks.
    </p>
  </div>
   <input type="text" placeholder="Search tasks..."value={searchTerm}
   onChange={(e)=>setSearchTerm(e.target.value)}
   className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none 
   focus:border-indigo-500"/>

 <select value={statusFilter}onChange={(e)=>setStatusFilter(e.target.value)}
 className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-4 py-3
 outline-none focus:border-indigo-500">
        <option value="All">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
 </select>

<select value={priorityFilter}onChange={(e)=>setPriorityFilter(e.target.value)}
 className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-4 py-3
 outline-none focus:border-indigo-500">
         <option value="All">All Priorities</option>
         <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
 </select>

 <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)}
  className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-4 py-3
 outline-none focus:border-indigo-500">
  <option value="Earliest">Due Date(Earliest First)</option>
  <option value="Latest">Due Date(Latest First)</option>
 </select>

   <div className="space-y-4">
    {sortedTasks.map((task) => (
      <div
        key={task.id}
        className="rounded-lg border border-slate-200 p-4"
      >
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <div>
            <h4 className="font-semibold text-slate-800">
              {task.title}
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              {task.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700">
              {task.priority}
            </span>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
              {task.status}
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Due Date: {task.dueDate || "No deadline"}
        </p>
        <button
  onClick={() => handleEditTask(task)}
  className="mt-3 mr-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-200"
>Edit</button>
        <button
  onClick={() => handleDeleteTask(task.id)}
  className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200"
>Delete</button>
      </div>
    ))}

    {tasks.length === 0 && (
      <p className="py-6 text-center text-sm text-slate-500">
        No tasks yet. Add your first task!
      </p>
    )}
  </div>
</section>
        </div>
    );
}
export default MyTasks;