import { TaskType } from "@/models/Task";
import { getSubtasks } from "../_actions/subtaskActions/getSubtasks";
import Task from "./Task";

type FetchingSubtask = {
  task: TaskType;
};

async function FetchingSubtask({ task }: FetchingSubtask) {
  const subtasks = await getSubtasks(task._id);

  return <Task task={task} subtasks={subtasks} />;
}

export default FetchingSubtask;
