import { useTasks } from "../context/taskcontext";
import { DndContext,useDraggable,useDroppable,type DragEndEvent } from "@dnd-kit/core";

function DraggableTask({ task }: { task: any }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });

  const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }: undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}
      className="mb-3 cursor-grab rounded-lg bg-white p-4 shadow-sm active:cursor-grabbing dark:bg-gray-700">
      <h4 className="font-medium text-slate-800 dark:text-white">{task.title}</h4>

      <p className="mt-2 text-sm text-slate-500 dark:text-gray-300">{task.description}</p>

      <span className="mt-3 inline-block text-xs text-slate-500 dark:text-gray-300">Priority: {task.priority}</span>
    </div>
  );
}
function Kanban() {

  const { tasks }=useTasks();
  const columns = ["Todo", "In Progress", "Review", "Done"];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <div key={column}
          className="min-h-[400px] rounded-xl bg-slate-100 p-4 dark:bg-gray-800">
          <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">{column}</h3>

         {tasks.filter((task)=>task.status===column).length===0?(
          <p className="text-sm text-slate-500 dark:text-gray-400">No tasks yet</p>
          ):(
           tasks.filter((task)=>task.status===column).map((task)=>(
            <div key={task.id} 
            className="mb-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
            <h4 className="font-medium text-slate-800 dark:white">{task.title}</h4>
            <p className="mt-2 text-sm text-slate-500 dark:text-gray-300">{task.description}</p>
            <span className="mt-3 inline-block text-xs text-slate-500 dark:text-gray-300">
              Priority: {task.priority}
            </span>
            </div>
           )) 
          )}
          
        </div>
      ))}
    </div>
  );
}

export default Kanban;