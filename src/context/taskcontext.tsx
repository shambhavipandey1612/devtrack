
import { createContext,useContext, useEffect, useState, type ReactNode, } from "react";

export type Task={
    id: number;
  title: string;
  description: string;
  priority:"High"|"Medium"|"Low";
  status: "Todo" | "In Progress" | "Done";
  dueDate:string;
};
type TaskContextType={
    tasks:Task[];
    setTasks:(value:Task[]|((prev:Task[])=>Task[]))=>void;
};
type TaskProviderProps={
    children: ReactNode;
};
export const TaskContext=createContext<TaskContextType|null>(null);
export const TaskProvider=
    ({children}:TaskProviderProps)=>{
        const[tasks,setTasks]=useState<Task[]>(()=>{
            const savedTasks=localStorage.getItem("tasks");
            if(savedTasks){
                try{
                    return JSON.parse(savedTasks) as Task[];
                } catch{
                    localStorage.removeItem("tasks");
                }
            }
            return [];
        });
        useEffect(()=>{
            localStorage.setItem("tasks",JSON.stringify(tasks));
        },[tasks]);
        return (
            <TaskContext.Provider value= {{tasks,setTasks}}>
                {children}
                </TaskContext.Provider>
        );
    };
    export const useTasks=()=>{
        const context=useContext(TaskContext);
        if(!context){
            throw new Error("useTasks must be used inside TaskProvider");
        }
        return context;
    };