function Kanban() {
  const columns = ["Todo", "In Progress", "Review", "Done"];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <div
          key={column}
          className="min-h-[400px] rounded-xl bg-slate-100 p-4 dark:bg-gray-800"
        >
          <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">
            {column}
          </h3>

          <p className="text-sm text-slate-500 dark:text-gray-400">
            No tasks yet
          </p>
        </div>
      ))}
    </div>
  );
}

export default Kanban;