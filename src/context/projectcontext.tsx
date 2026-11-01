
import { createContext, useContext,useEffect, useState, type ReactNode,
type Dispatch, type SetStateAction,} from "react";

export type Project = {
  id: number;
  name: string;
  description: string;
  status: "In Progress" | "Completed" | "On Hold";
};

type ProjectContextType = {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
};

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("projects");

    if (savedProjects) {
      try {
        return JSON.parse(savedProjects) as Project[];
      } catch {
        localStorage.removeItem("projects");
      }
    }

    return [
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
    ];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjects must be used inside ProjectProvider");
  }

  return context;
};
