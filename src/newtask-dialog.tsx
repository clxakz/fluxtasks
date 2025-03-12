import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useTask } from "@/components/TaskProvider";

export default function NewTaskDialog({ children }: { children: ReactNode }) {
  const { createTask } = useTask();

  const [todoText, setTodoText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);


  // Handle clicking the create button
  function onCreateTask() {
    if (todoText.trim() !== "") {
      createTask(todoText);
      setIsOpen(false);
    } else {
      setError("Todo text cannot be empty");
    }
  }


  // Reset error state if todoText is no longer empty
  useEffect(() => {
    if (todoText.trim() !== "") {
      setError("");
    }
  }, [todoText]);


  // Reset values on dialog close
  useEffect(() => {
    if (!isOpen) {
      setError("");
      setTodoText("");
    }
  }, [isOpen]);


  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && todoText.trim() !== "") {
        onCreateTask();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, todoText]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle>Create a new Task</DialogTitle>
          <DialogDescription className="sr-only">
            New task dialog
          </DialogDescription>
          <DialogDescription className="text-destructive">
            {error}
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Todo..."
          onChange={(e) => setTodoText(e.target.value)}
        />

        <DialogFooter>
          <Button className="min-w-24 ml-auto" onClick={onCreateTask}>
            <Check />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
