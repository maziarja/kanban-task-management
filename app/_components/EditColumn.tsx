"use client";

import { ColumnType } from "@/models/Column";
import { ChangeEvent } from "react";
import { IoClose } from "react-icons/io5";
import { NewColumn } from "./UpdateBoardForm";

type EditColumnProps = {
  column: ColumnType | NewColumn;
  onUpdateColumn: (columnId: string, newColName: string) => void;
  onDeleteColumn: (columnId: string) => void;
};

function EditColumn({
  column,
  onUpdateColumn,
  onDeleteColumn,
}: EditColumnProps) {
  function handleRemoveColumn() {
    onDeleteColumn(column._id);
  }

  function handleChangeColumn(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target.value;
    onUpdateColumn(column._id, target);
  }

  return (
    <>
      <div className="relative flex items-center gap-2">
        <input
          required
          className={`body-l ${"error" in column && column.error ? "border-red" : "border-light dark:border-dark"} w-full rounded-lg border-1 p-2 pl-4 text-black dark:text-white`}
          type="text"
          name="column"
          defaultValue={column.name}
          id={`column-${column._id}`}
          onChange={handleChangeColumn}
        />
        {"error" in column && column.error && (
          <p className="body-l text-red absolute top-2 right-10">
            {column.error}
          </p>
        )}
        <button onClick={handleRemoveColumn} className="cursor-pointer">
          <IoClose
            className={`${"error" in column && column.error ? "fill-red" : "fill-medium-grey"} text-2xl`}
          />
        </button>
      </div>
    </>
  );
}

export default EditColumn;
