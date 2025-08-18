"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useModal } from "../_contexts/ModalContext";
import { FaEllipsisVertical } from "react-icons/fa6";
import SubtaskForm from "./SubtaskForm";
import { TaskType } from "@/models/Task";
import { SubtaskType } from "@/models/Subtask";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { ColumnType } from "@/models/Column";
import { updateTaskStatus } from "../_actions/taskActions/updateTaskStatus";
import PageSkeleton from "./_skeleton/PageSkeleton";
import TaskModalSkeleton from "./_skeleton/TaskModalSkeleton";
import DropdownTaskMenuModal from "./DropdownTaskMenuModal";

type TaskModalContentProps = {
  task: TaskType | null;
  subtasks: SubtaskType[] | null;
  columns: ColumnType[];
};

function TaskModalContent({ task, subtasks, columns }: TaskModalContentProps) {
  const { modal, toggleModal } = useModal();
  const [taskState, setTaskState] = useState(task);
  const [subtasksState, setSubtasksState] = useState(subtasks);
  const [status, setStatus] = useState(task && task.status);
  const [isPending, startTransition] = useTransition();

  const ref = useOutsideClick(() => {
    toggleModal("taskModal", false);
    toggleModal("taskMenuModal", false);
    const url = new URL(window.location.href);
    url.searchParams.delete("taskId");
    window.history.pushState({}, "", url.toString());
    setTaskState(null);
    setSubtasksState(null);
  });

  useEffect(() => {
    setTaskState(task);
    setSubtasksState(subtasks);
    if (task) setStatus(task.status);
  }, [task, subtasks]);

  const completedSubtasks =
    subtasks &&
    subtasks.filter((subtask) => subtask.isCompleted === true).length;

  async function handleChangeStatus(e: ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;

    setStatus(newStatus);
    startTransition(async () => {
      if (task) await updateTaskStatus(task._id, newStatus);
    });
  }

  if (!modal.taskModal) return null;

  return (
    <>
      {isPending ? (
        <PageSkeleton />
      ) : (
        <div className="fixed inset-0 z-1 bg-black/65 dark:bg-black/45"></div>
      )}
      <div ref={ref} className="flex justify-center">
        <div className="dark:bg-dark-grey absolute inset-x-1/2 top-1/2 z-999 flex w-[90%] max-w-120 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border-1 border-gray-300 bg-white px-4 py-6 pr-6 shadow-2xl dark:border-gray-800">
          {subtasksState && taskState ? (
            <div className="relative">
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="heading-l py-2 text-black dark:text-white">
                  {task && task.title}
                </p>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    toggleModal("taskMenuModal", true);
                  }}
                >
                  <FaEllipsisVertical className="text-medium-grey text-2xl" />
                </button>
              </div>
              <p className="body-l text-medium-grey mb-6">
                {task && task.description}
              </p>
              <p className="text-medium-grey body-m mb-4 dark:text-white">
                Subtasks ({completedSubtasks} of {subtasks && subtasks.length})
              </p>

              <div className="mb-6 flex flex-col gap-2.5">
                {subtasks &&
                  subtasks.map((subtask) => {
                    return <SubtaskForm key={subtask._id} subtask={subtask} />;
                  })}
              </div>
              <div className="mb-3">
                <p className="body-m text-medium-grey mb-2 dark:text-white">
                  Current Status
                </p>
                <select
                  className="body-l border-light dark:border-dark w-full cursor-pointer rounded-lg border-1 p-2 text-black dark:text-white"
                  name="status"
                  id={`status-${task?._id}`}
                  value={status || ""}
                  onChange={handleChangeStatus}
                >
                  {columns.map((column) => (
                    <option key={column._id} value={column.name}>
                      {column.name}
                    </option>
                  ))}
                </select>
              </div>
              {modal.taskMenuModal && <DropdownTaskMenuModal />}
            </div>
          ) : (
            <TaskModalSkeleton subtasks={subtasks} />
          )}
        </div>
      </div>
    </>
  );
}

export default TaskModalContent;
