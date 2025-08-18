"use client";

import { SubtaskType } from "@/models/Subtask";
import { ChangeEvent } from "react";
import { IoClose } from "react-icons/io5";

type EditSubtaskProps = {
  subtask: SubtaskType & { error?: string };
  onEditSubtask: (subtaskId: string, newTitle: string) => void;
  onRemoveSubtask: (subtaskId: string) => void;
};

function EditSubtask({
  subtask,
  onEditSubtask,
  onRemoveSubtask,
}: EditSubtaskProps) {
  function handleOnEditSubtask(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value;
    onEditSubtask(newTitle, subtask._id);
  }

  function handleOnRemoveSubtask() {
    onRemoveSubtask(subtask._id);
  }

  return (
    <>
      <div className="relative flex items-center gap-2">
        <input
          required
          className={`body-l ${
            "error" in subtask && subtask.error
              ? "border-red"
              : "border-light dark:border-dark"
          } w-full rounded-lg border-1 p-2 pl-4 text-black dark:text-white`}
          type="text"
          name="column"
          value={subtask.title}
          onChange={handleOnEditSubtask}
          //   placeholder={subtask.placeholder}
        />

        {"error" in subtask && subtask.error && (
          <p className="body-l text-red absolute top-2 right-10">
            {subtask.error}
          </p>
        )}

        <button onClick={handleOnRemoveSubtask} className="cursor-pointer">
          <IoClose
            className={`${false ? "fill-red" : "fill-medium-grey"} text-2xl`}
          />
        </button>
      </div>
    </>
  );
}

export default EditSubtask;
