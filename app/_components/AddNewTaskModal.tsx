"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import PageSkeleton from "./_skeleton/PageSkeleton";

import { useEffect, useState, useTransition } from "react";
import { ImSpinner6 } from "react-icons/im";
import { ColumnType } from "@/models/Column";
import AddSubtask from "./AddSubtask";
import { createNewTask } from "../_actions/taskActions/createNewTask";
import { useModal } from "../_contexts/ModalContext";

type AddNewTaskModalProps = {
  colNamesAndIds: ColumnType[];
};

export type SubtaskStateType = {
  title: string;
  tempId: string;
  isCompleted: boolean;
  placeholder: string;
  error?: string;
};

function AddNewTaskModal({ colNamesAndIds }: AddNewTaskModalProps) {
  const [subtaskState, setSubtaskState] = useState<SubtaskStateType[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState(colNamesAndIds[0]?.name);
  const { modal, toggleModal } = useModal();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<{ title?: string }>({});

  const ref = useOutsideClick(() => {
    toggleModal("addNewTaskModal", false);
    setTaskDescription("");
    setTaskTitle("");
    setSubtaskState([]);
    setError({});
  });

  useEffect(() => {
    setTaskStatus(colNamesAndIds[0]?.name);
  }, [colNamesAndIds]);

  if (!modal.addNewTaskModal) return null;

  // Add subtasks

  function handleAddNewSubtask() {
    const placeholders = [
      "e.g. Make coffee",
      "e.g. Drink coffee & smile",
      "e.g. Read a book",
      "e.g. Take a short walk",
      "e.g. Write a journal",
      "e.g. Plan tomorrow's tasks",
      "e.g. Call a friend",
      "e.g. Organize workspace",
      "e.g. Listen to music",
      "e.g. Meditate for 5 minutes",
    ];
    const randomPlaceholder =
      placeholders[Math.floor(Math.random() * placeholders.length)];

    const newSubtask = {
      title: "",
      isCompleted: false,
      tempId: crypto.randomUUID(),
      placeholder: randomPlaceholder,
      error: "",
    };

    setSubtaskState((prevSubtask) => [...prevSubtask, newSubtask]);
  }

  // Remove a subtask
  function handleRemoveSubtask(subtaskTempId: string) {
    setSubtaskState((prevSubtask) =>
      prevSubtask.filter((subtask) => subtask.tempId !== subtaskTempId),
    );
  }

  // Update subtasks

  function handleUpdateSubtask(subtaskTempId: string, newTitle: string) {
    setSubtaskState((prevSubtask) =>
      prevSubtask.map((subtask) =>
        subtask.tempId === subtaskTempId
          ? { ...subtask, title: newTitle }
          : subtask,
      ),
    );
  }

  // Create new task and its subtasks into DB

  function handleCreateNewTask() {
    const currentColumn = colNamesAndIds.find((col) => col.name === taskStatus);
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      subtasks: subtaskState,
      columnId: currentColumn?._id,
    };

    startTransition(async () => {
      const result = await createNewTask(newTask);

      if (result.error?.title) {
        setError({ title: result.error.title });
      } else {
        setError({});
      }

      if (result.error?.subtask) {
        setSubtaskState((prev) =>
          prev.map((subtask) =>
            subtask.title.trim() === ""
              ? { ...subtask, error: result.error.subtask }
              : subtask,
          ),
        );
      }

      if (result.success) {
        toggleModal("addNewTaskModal", false);
        setTaskDescription("");
        setTaskTitle("");
        setSubtaskState([]);
      }
    });
  }

  return (
    <>
      {isPending ? (
        <PageSkeleton />
      ) : (
        <div className="fixed inset-0 bg-black/65"></div>
      )}

      <div ref={ref} className="flex w-full justify-center">
        <div className="dark:bg-dark-grey absolute inset-x-1/2 top-1/2 flex w-[90%] max-w-120 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border-1 border-gray-300 bg-white px-4 py-6 pr-6 shadow-2xl dark:border-gray-900">
          <p className="heading-l mb-6 text-black dark:text-white">
            Add New Task
          </p>
          <label className="body-m text-medium-grey relative mb-6 flex flex-col gap-2 dark:text-white">
            Title
            <input
              required
              placeholder="e.g. Take coffee break"
              className={`body-l ${!error.title ? "border-light" : "border-red"} ${!error.title ? "dark:border-dark" : "dark:border-red"} w-full rounded-lg border-1 p-2.5 text-black dark:text-white`}
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            {error.title && (
              <p className="body-l text-red absolute top-8 right-3">
                {error.title}
              </p>
            )}
          </label>
          <label className="body-m text-medium-grey mb-6 flex flex-col gap-2 dark:text-white">
            Description
            <textarea
              placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
              className="body-l border-light dark:border-dark h-28 w-full resize-none rounded-lg border-1 p-2.5 text-black dark:text-white"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </label>
          <p className="body-m text-medium-grey mb-4 dark:text-white">
            Subtasks
          </p>
          <div className="mb-6 flex flex-col gap-4">
            {subtaskState.map((subtask) => (
              <AddSubtask
                key={subtask.tempId}
                subtask={subtask}
                onRemoveSubtask={handleRemoveSubtask}
                onUpdateSubtask={(newTitle) =>
                  handleUpdateSubtask(subtask.tempId, newTitle)
                }
              />
            ))}
            <button
              onClick={handleAddNewSubtask}
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
              className="body-l border-light dark:border-dark w-full rounded-lg border-1 p-2 text-black dark:text-white"
              name="status"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              {colNamesAndIds.map((column) => (
                <option key={column._id} value={column.name}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleCreateNewTask}
            className="bg-purple hover:bg-purple-hover active:bg-purple-hover cursor-pointer rounded-full p-3 text-[13px] font-bold text-white"
          >
            {!isPending ? (
              <p>Create Task</p>
            ) : (
              <ImSpinner6 className="mx-auto animate-spin text-xl" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddNewTaskModal;
