import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useTask } from "./components/TaskProvider";

export default function Task({ task }: { task: {id: number, isChecked: boolean, text: string} }) {
  const { deleteTask, checkTask } = useTask();

  return (
    <div className="flex items-center gap-2 px-2 py-1 border-1 border-border bg-card rounded-md">
      <Checkbox
        className="w-5 h-5"
        defaultChecked={task.isChecked}
        onCheckedChange={(value: boolean) => checkTask(task.id, value)}
      />

      <TooltipProvider>
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <span className={`truncate flex-1 ${task.isChecked && "line-through"}`}>
              {task.text}
            </span>
          </TooltipTrigger>
          {task.text.length > 45 && (
            <TooltipContent className="max-w-xs break-words">
              <p>{task.text}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <Button
        variant={"ghost"}
        size={"icon"}
        className="ml-auto"
        onClick={() => deleteTask(task.id)}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
