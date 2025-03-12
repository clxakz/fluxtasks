import { Button } from "@/components/ui/button";
import { Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import NewTaskDialog from "./newtask-dialog";

export default function Dock() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className="flex relative rounded-md p-1 items-center justify-center border-border bg-card border-1">
      <NewTaskDialog>
        <Button size="icon" className="w-32">
          <Plus />
        </Button>
      </NewTaskDialog>

      <span className="absolute right-0 p-1">
        <Button size="icon" variant={"ghost"} onClick={toggleTheme}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </span>
    </div>
  );
}
