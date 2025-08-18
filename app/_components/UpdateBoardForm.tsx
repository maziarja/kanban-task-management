"use client";

import { ColumnType } from "@/models/Column";
import { useEffect, useState, useTransition } from "react";
import EditColumn from "./EditColumn";
import { BoardType } from "@/models/Board";
import { ObjectId } from "bson";
import { updateBoard } from "../_actions/boardActions/updateBoard";
import { useModal } from "../_contexts/ModalContext";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ImSpinner6 } from "react-icons/im";

type UpdateBoardFormProps = {
  columns: ColumnType[];
  currentBoard: BoardType;
  boardId: string;
  userId: string | undefined;
};

export type NewColumn = {
  boardId: string;
  _id: string;
  userId: string | undefined;
  name?: string;
  error?: string;
};

function UpdateBoardForm({
  columns,
  boardId,
  currentBoard,
  userId,
}: UpdateBoardFormProps) {
  const [columnsState, setColumnsState] = useState<ColumnType[] | NewColumn[]>(
    columns,
  );
  const [newBoardName, setNewBoardName] = useState(currentBoard?.name);
  const [error, setError] = useState<{ boardName?: string }>({});
  const { modal, toggleModal } = useModal();
  const [isPending, startTransition] = useTransition();

  const ref = useOutsideClick(() => {
    toggleModal("editBoardModal", false);
    setError({});
    setColumnsState(columns);
    setNewBoardName(currentBoard?.name);
  });

  useEffect(() => {
    setColumnsState(columns);
    setNewBoardName(currentBoard?.name);
  }, [columns, currentBoard?.name]);

  // Create a Mongo-style ObjectId
  const _id = new ObjectId().toHexString();

  const newColumn = {
    boardId,
    _id,
    userId,
    error: "",
    name: "",
  };

  function handleAddColumn() {
    setColumnsState((col) => [...col, newColumn]);
  }

  function handleDeleteColumn(columnId: string) {
    setColumnsState(columnsState.filter((col) => col._id !== columnId));
  }

  const handleUpdateColumnName = (columnId: string, newColName: string) => {
    const updatedColumn = columnsState.map((col) =>
      col._id === columnId
        ? {
            ...col,
            name: newColName,
          }
        : col,
    );
    setColumnsState(updatedColumn);
  };

  async function handleUpdateBoard() {
    startTransition(async () => {
      const result = await updateBoard(boardId, newBoardName, columnsState);

      // Validation
      if (result.error?.boardName) {
        setError({ boardName: result.error.boardName });
      } else {
        setError({});
      }
      if (result.error?.column) {
        setColumnsState((prevCols) =>
          prevCols.map((col) =>
            col.name === "" ? { ...col, error: result.error.column } : col,
          ),
        );
      }

      if (result.success) {
        toggleModal("editBoardModal", false);
      }
    });
  }

  if (!modal.editBoardModal) return;

  return (
    <>
      <div className="fixed inset-0 bg-black/65 dark:bg-black/45"></div>
      <div ref={ref} className="flex w-full justify-center">
        <div className="dark:bg-dark-grey absolute inset-x-1/2 top-1/2 flex w-[90%] max-w-120 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border-1 border-gray-300 bg-white px-4 py-6 pr-6 shadow-2xl dark:border-gray-800">
          <p className="heading-l mb-6 text-black dark:text-white">
            Edit Board
          </p>
          <label className="body-m text-medium-grey relative mb-6 flex flex-col gap-2 dark:text-white">
            Board Name
            <input
              required
              className={`body-l ${error.boardName ? "border-red" : "border-light dark:border-dark"} w-full rounded-lg border-1 p-2 text-black dark:text-white`}
              type="text"
              defaultValue={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
            {error.boardName && (
              <p className="body-l text-red absolute top-8 right-3">
                {error.boardName}
              </p>
            )}
          </label>
          <p className="body-m text-medium-grey mb-2 dark:text-white">
            Board Columns
          </p>
          <div className="mb-6 flex flex-col gap-4">
            {columnsState.map((column) => (
              <EditColumn
                key={column._id}
                column={column}
                onUpdateColumn={handleUpdateColumnName}
                onDeleteColumn={handleDeleteColumn}
              />
            ))}
            <button
              onClick={handleAddColumn}
              className="text-purple bg-purple/10 cursor-pointer rounded-full p-3 text-[13px] font-bold dark:bg-white"
            >
              + Add New Column
            </button>
          </div>
          <button
            onClick={handleUpdateBoard}
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

export default UpdateBoardForm;
