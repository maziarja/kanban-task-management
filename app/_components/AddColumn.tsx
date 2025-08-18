import { IoClose } from "react-icons/io5";
import { ColumnStateType } from "./AddNewBoardModal";
import { ChangeEvent } from "react";

type AddColumnProps = {
  column: ColumnStateType;
  onUpdateColumn: (newName: string, column: ColumnStateType) => void;
  onRemoveColumn: (column: ColumnStateType) => void;
};

function AddColumn({ column, onUpdateColumn, onRemoveColumn }: AddColumnProps) {
  function handleOnUpdateColumn(e: ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    onUpdateColumn(newName, column);
  }

  function handleOnRemoveColumn() {
    onRemoveColumn(column);
  }

  return (
    <>
      <div className="relative flex items-center gap-2">
        <input
          required
          className={`body-l ${column.error ? "border-red" : "border-light dark:border-dark"} w-full rounded-lg border-1 p-2 pl-4 text-black dark:text-white`}
          type="text"
          name="column"
          value={column.name}
          onChange={handleOnUpdateColumn}
        />
        {column.error && (
          <p className="body-l text-red absolute top-2 right-10">
            {column.error}
          </p>
        )}
        <button onClick={handleOnRemoveColumn} className="cursor-pointer">
          <IoClose
            className={`${column.error ? "fill-red" : "fill-medium-grey"} text-2xl`}
          />
        </button>
      </div>
    </>
  );
}

export default AddColumn;
