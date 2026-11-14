
import { useTasks, type Task } from "../context/taskcontext";
import { DndContext, useDraggable, useDroppable, type DragEndEvent,
} from "@dnd-kit/core";
import type { ReactNode } from "react";

function DraggableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}
      className="mb-3 cursor-grab rounded-lg bg-white p-4 shadow-sm active:cursor-grabbing dark:bg-gray-700">
      <h4 className="font-medium text-slate-800 dark:text-white">{task.title}</h4>

      <p className="mt-2 text-sm text-slate-500 dark:text-gray-300">{task.description}</p>

      <span className="mt-3 inline-block text-xs text-slate-500 dark:text-gray-300">Priority: {task.priority}</span>
    </div>
  );
}

function DroppableColumn({
  column,
  children,
}: {
  column: string;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[400px] rounded-xl p-4 transition-colors ${
        isOver
          ? "bg-blue-100 dark:bg-blue-900"
          : "bg-slate-100 dark:bg-gray-800"
      }`}>
      <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">{column}</h3>

      {children}
    </div>
  );
}

function Kanban() {
  const { tasks, setTasks } = useTasks();

  const columns = ["Todo", "In Progress", "Review", "Done"];

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Check whether the task was dropped over a column
    if (!over) return;

    const taskId = active.id;
    const newStatus = String(over.id);

    // Update the task's status
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        String(task.id) === String(taskId)
          ? { ...task, status: newStatus as Task["status"] }
          : task
      )
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => (
          <DroppableColumn key={column} column={column}>
            {tasks.filter((task) => task.status === column).length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-gray-400">
                No tasks yet
              </p>
            ) : (
              tasks
                .filter((task) => task.status === column)
                .map((task) => (
                  <DraggableTask key={task.id} task={task} />
                ))
            )}
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
}

export default Kanban;
