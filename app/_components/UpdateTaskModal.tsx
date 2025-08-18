"use client";

import { ImSpinner6 } from "react-icons/im";
import EditSubtask from "./EditSubtask";
import { TaskType } from "@/models/Task";
import { SubtaskType } from "@/models/Subtask";
import { ColumnType } from "@/models/Column";
import { useEffect, useState, useTransition } from "react";
import { useModal } from "../_contexts/ModalContext";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ObjectId } from "bson";
import { updateTask } from "../_actions/taskActions/updateTask";

type UpdateTaskModalProps = {
  task: TaskType;
  subtasks: SubtaskType[];
  columns: ColumnType[];
};

function UpdateTaskModal({ task, subtasks, columns }: UpdateTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [subtasksState, setSubtasksState] = useState(subtasks);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<{ title?: string }>({});

  const { toggleModal, modal } = useModal();
  const ref = useOutsideClick(() => {
    toggleModal("editTaskModal", false);
    setDescription("");
    setTitle("");
    setStatus("");
    setSubtasksState([]);
  });

  useEffect(() => {
    setSubtasksState(subtasks);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [subtasks, task.description, task.title, task.status, columns]);

  function handleAddSubtask() {
    const _id = new ObjectId().toHexString();

    const newSubtask = {
      title: "",
      _id,
      isCompleted: false,
      taskId: task._id,
      userId: "",
      createdAt: new Date(),
    };

    setSubtasksState((prev) => [...prev, newSubtask]);
  }

  function handleEditSubtask(newTitle: string, subtaskId: string) {
    setSubtasksState((prevSubtasks) =>
      prevSubtasks.map((subtask) =>
        subtask._id === subtaskId ? { ...subtask, title: newTitle } : subtask,
      ),
    );
  }

  function handleRemoveSubtask(subtaskId: string) {
    setSubtasksState((prevSubtask) =>
      prevSubtask.filter((subtask) => subtask._id !== subtaskId),
    );
  }

  function handleUpdateTask() {
    const updatedTask = {
      title,
      description,
      subtasks: subtasksState,
      status,
      relatedColumns: columns,
    };

    startTransition(async () => {
      const result = await updateTask(updatedTask, task._id);

      // Validation
      if (result.error?.title) {
        setError({ title: result.error.title });
      } else {
        setError({});
      }
      if (result.error?.subtask) {
        setSubtasksState((prevSubtasks) =>
          prevSubtasks.map((subtask) =>
            subtask.title === ""
              ? { ...subtask, error: result.error.subtask }
              : subtask,
          ),
        );
      }

      if (result.success) toggleModal("editTaskModal", false);
    });
  }

  if (!modal.editTaskModal) return null;

  return (
    <>
      <div className="fixed inset-0 z-1 bg-black/65 dark:bg-black/45"></div>
      <div className="flex w-full justify-center">
        <div
          ref={ref}
          className="dark:bg-dark-grey absolute inset-x-1/2 top-1/2 z-999 flex w-[90%] max-w-120 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border-1 border-gray-300 bg-white px-4 py-6 pr-6 shadow-2xl dark:border-gray-800"
        >
          <p className="heading-l mb-6 text-black dark:text-white">Edit Task</p>
          <label className="body-m text-medium-grey relative mb-6 flex flex-col gap-2 dark:text-white">
            Title
            <input
              required
              placeholder="e.g. Take coffee break"
              className={`body-l ${!error.title ? "border-light" : "border-red"} dark:border-dark w-full rounded-lg border-1 p-2.5 text-black dark:text-white`}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error && (
              <p className="body-l text-red absolute top-8 right-3">
                {error.title}
              </p>
            )}
          </label>
          <label className="body-m text-medium-grey mb-6 flex flex-col gap-2 dark:text-white">
            Description
            <textarea
              placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
              className="body-l dark:border-dark border-light h-28 w-full resize-none rounded-lg border-1 p-2.5 text-black dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <p className="body-m text-medium-grey mb-4 dark:text-white">
            Subtasks
          </p>
          <div className="mb-6 flex flex-col gap-4">
            {subtasksState.map((subtask) => (
              <EditSubtask
                subtask={subtask}
                key={subtask._id}
                onEditSubtask={handleEditSubtask}
                onRemoveSubtask={handleRemoveSubtask}
              />
            ))}
            <button
              onClick={handleAddSubtask}
              className="text-purple bg-purple/10 cursor-pointer rounded-full p-3 text-[13px] font-bold dark:bg-white"
            >
              + Add New Subtask
            </button>
          </div>
          <div className="mb-6.5">
            <p className="body-m text-medium-grey mb-2 dark:text-white">
              Status
            </p>
            <select
              className="body-l border-light dark:border-dark w-full cursor-pointer rounded-lg border-1 p-2 text-black dark:text-white"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {columns.map((column) => (
                <option key={column._id} value={column.name}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleUpdateTask}
            className="bg-purple hover:bg-purple-hover active:bg-purple-hover cursor-pointer rounded-full p-3 text-[13px] font-bold text-white"
          >
            {!isPending ? (
              <p>Save Changes</p>
            ) : (
              <ImSpinner6 className="mx-auto animate-spin text-xl" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateTaskModal;
