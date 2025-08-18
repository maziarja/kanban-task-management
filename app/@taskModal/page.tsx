import Task from "@/models/Task";
import { getColumns } from "../_actions/columnActions/getColumns";
import { getSubtasks } from "../_actions/subtaskActions/getSubtasks";
import { getTaskById } from "../_actions/taskActions/getTaskById";
import TaskModalContent from "../_components/TaskModalContent";
import DeleteTaskModal from "../_components/DeleteTaskModal";
import UpdateTaskModal from "../_components/UpdateTaskModal";

async function Page({
  searchParams,
}: {
  searchParams: {
    taskId: string | null;
  };
}) {
  const { taskId } = await searchParams;
  const currentTask = await Task.findById(taskId).populate({
    path: "columnId",
    populate: {
      path: "boardId",
    },
  });
  const currentBoardId = currentTask?.columnId.boardId._id;

  const [task, subtasks, columns] = await Promise.all([
    getTaskById(taskId),
    getSubtasks(taskId),
    getColumns(currentBoardId),
  ]);

  if (!task) return null;

  return (
    <>
      <TaskModalContent task={task} subtasks={subtasks} columns={columns} />
      <DeleteTaskModal task={task} />
      <UpdateTaskModal task={task} subtasks={subtasks} columns={columns} />
    </>
  );
}
export default Page;
