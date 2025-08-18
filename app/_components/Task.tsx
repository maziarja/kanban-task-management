"use client";

import { SubtaskType } from "@/models/Subtask";
import { TaskType } from "@/models/Task";
import { useModal } from "../_contexts/ModalContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type TaskProps = {
  subtasks: SubtaskType[];
  task: TaskType;
};

function Task({ task, subtasks }: TaskProps) {
  const { toggleModal } = useModal();
  const searchParams = useSearchParams();
  const boardId = searchParams.get("boardId");

  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted === true,
  ).length;

  return (
    <Link
      href={
        boardId
          ? `/?boardId=${boardId}&taskId=${task?._id}`
          : `/?taskId=${task?._id}`
      }
      onClick={() => toggleModal("taskModal", true)}
      className="group flex cursor-pointer flex-col gap-2"
    >
      <p className="heading-m group-hover:text-purple max-w-[280px] text-black dark:text-white">
        {task.title}
      </p>
      <p className="text-medium-grey body-m">
        {completedSubtasks} of {subtasks.length} subtasks
      </p>
    </Link>
  );
}

export default Task;
