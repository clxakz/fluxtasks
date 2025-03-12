import { useTask } from "@/components/TaskProvider";
import Task from "./task";
import { Reorder } from "framer-motion";

function App() {
  const { tasks, setTasks } = useTask();

  return (
    <Reorder.Group
      axis="y"
      values={tasks}
      onReorder={setTasks}
      style={{ overflowY: "auto", maxHeight: "100vh" }}
      id={"noscrollbar"}
    >
      <div className="flex flex-col gap-1">
        {tasks.map((task) => (
          <Reorder.Item key={task.id} value={task}>
            <Task task={task} />
          </Reorder.Item>
        ))}
      </div>
    </Reorder.Group>
  );
}

export default App;
