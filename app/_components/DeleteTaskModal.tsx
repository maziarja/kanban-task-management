"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useModal } from "../_contexts/ModalContext";
import { useTransition } from "react";
import { ImSpinner6 } from "react-icons/im";
import { TaskType } from "@/models/Task";
import { deleteTask } from "../_actions/taskActions/deleteTask";

function DeleteTaskModal({ task }: { task: TaskType }) {
  const { toggleModal, modal } = useModal();
  const ref = useOutsideClick(() => toggleModal("deleteTaskModal", false));
  const [isPending, startTransition] = useTransition();

  if (!modal.deleteTaskModal) return null;

  function handleDeleteTask() {
    startTransition(async () => {
      const result = await deleteTask(task._id);
      if (result.success) {
        toggleModal("deleteTaskModal", false);
      }
    });
  }

  return (
    <>
      <div className="fixed inset-0 z-1 bg-black/65 dark:bg-black/45"></div>
      <div ref={ref} className="flex w-full justify-center">
        <div className="dark:bg-dark-grey absolute inset-x-1/2 top-1/2 z-999 flex w-[90%] max-w-120 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border-1 border-gray-300 bg-white px-4 py-6 pr-6 shadow-2xl dark:border-gray-800">
          <p className="heading-l text-red mb-6">Delete this task?</p>
          <p className="text-medium-grey body-l mb-6">
            Are you sure you want to delete the &lsquo;{task.title}&lsquo; task
            and its subtasks? This action cannot be reversed.
          </p>
          <button
            onClick={handleDeleteTask}
            disabled={isPending}
            className="bg-red hover:bg-red-hover active:bg-red-hover mb-4 cursor-pointer rounded-full py-3 text-[13px] font-bold text-white"
          >
            {!isPending ? (
              <p>Delete</p>
            ) : (
              <ImSpinner6 className="mx-auto animate-spin text-xl" />
            )}
          </button>
          <button
            onClick={() => {
              toggleModal("deleteTaskModal", false);
            }}
            className="bg-purple/10 text-purple hover:bg-purple-hover/20 active:bg-purple-hover/20 cursor-pointer rounded-full py-3 text-[13px] font-bold dark:bg-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteTaskModal;
