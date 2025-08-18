"use client";

import { SubtaskType } from "@/models/Subtask";
import { useState } from "react";
import { updateSubtaskChecked } from "../_actions/subtaskActions/updateSubtaskChecked";

type SubtaskFormProps = {
  subtask: SubtaskType;
};

function SubtaskForm({ subtask }: SubtaskFormProps) {
  const [isSubtaskCompleted, setIsSubtaskCompleted] = useState(
    subtask.isCompleted,
  );

  async function handleChange() {
    setIsSubtaskCompleted((isSubtaskCompleted) => !isSubtaskCompleted);
    await updateSubtaskChecked(subtask._id);
  }

  return (
    <div
      className="bg-light-grey dark:bg-very-dark-grey hover:bg-purple-hover/20 active:bg-purple-hover/20 flex items-center gap-4 rounded-lg p-3"
      key={subtask._id}
    >
      <input
        type="checkbox"
        id={`title-${subtask._id}`}
        name="title"
        className="cursor-pointer"
        checked={isSubtaskCompleted}
        onChange={handleChange}
      />
      <label
        htmlFor={`title-${subtask._id}`}
        className={`body-m cursor-pointer ${isSubtaskCompleted ? "text-medium-grey" : "text-black dark:text-white"} ${isSubtaskCompleted && "line-through"} `}
      >
        {subtask.title}
      </label>
    </div>
  );
}

export default SubtaskForm;
