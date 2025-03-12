import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TaskContextType = {
  createTask: (text: string) => void;
  deleteTask: (id: number) => void;
  checkTask: (id: number, value: boolean) => void;
  tasks: { id: number; isChecked: boolean; text: string }[];
  setTasks: React.Dispatch<
    React.SetStateAction<{ id: number; isChecked: boolean; text: string }[]>
  >;
};

const TaskContext = createContext<TaskContextType  | null>(null);

export default function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<{ id: number; isChecked: boolean; text: string }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    async function loadTasks() {
      const result = await window.api.loadDb();
      setTasks(result ?? []);
      setIsLoading(false);
    }

    // Load all tasks on startup
    useEffect(() => {
      loadTasks();
    }, [])

    const createTask = (text: string) => {
      setTasks((prevTasks) => {
        // Get the highest ID from existing todos or default to 0 if no todos exist
        const nextId =
          prevTasks.length > 0
            ? Math.max(...prevTasks.map((task) => task.id)) + 1
            : 0;

        // Create a new todo with the next available ID
        return [...prevTasks, { id: nextId, isChecked: false, text }];
      });
    };


    const deleteTask = (id: number) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };


    const checkTask = (id: number, value: boolean) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isChecked: value } : task
        )
      );
    };


    // Save tasks to database when list updates
    useEffect(() => {
      if (!isLoading) {
        console.log(tasks);
        window.api.saveDb(tasks);
      }
    }, [tasks]);

  return <TaskContext.Provider value={{ createTask, tasks, setTasks, deleteTask, checkTask }}>{children}</TaskContext.Provider>;
}

export function useTask() {
    const context = useContext(TaskContext);
    if (!context) {
      throw new Error("useTodo must be used within a TodoProvider");
    }
    return context;
  }
