import { IoClose } from "react-icons/io5";
import { SubtaskStateType } from "./AddNewTaskModal";

type AddSubtaskProps = {
  subtask: SubtaskStateType;
  onRemoveSubtask: (subtaskTempId: string) => void;
  onUpdateSubtask: (newTitle: string) => void;
};

function AddSubtask({
  subtask,
  onRemoveSubtask,
  onUpdateSubtask,
}: AddSubtaskProps) {
  return (
    <>
      <div className="relative flex items-center gap-2">
        <input
          required
          className={`body-l ${subtask.error ? "border-red" : "border-light"} ${
            subtask.error ? "dark:border-red" : "dark:border-dark"
          } w-full rounded-lg border-1 p-2 pl-4 text-black dark:text-white`}
          type="text"
          name="column"
          placeholder={subtask.placeholder}
          onChange={(e) => onUpdateSubtask(e.target.value)}
          value={subtask.title}
        />
        {subtask.error && (
          <p className="body-l text-red absolute top-2 right-10">
            {subtask.error}
          </p>
        )}
        <button
          onClick={() => onRemoveSubtask(subtask.tempId)}
          className="cursor-pointer"
        >
          <IoClose
            className={`${subtask.error ? "fill-red" : "fill-medium-grey"} text-2xl`}
          />
        </button>
      </div>
    </>
  );
}

export default AddSubtask;
