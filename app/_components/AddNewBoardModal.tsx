"use client";
import { useState, useTransition } from "react";
import AddColumn from "./AddColumn";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createNewBoard } from "../_actions/boardActions/createNewBoard";
import PageSkeleton from "./_skeleton/PageSkeleton";
import { useRouter } from "next/navigation";
import { ImSpinner6 } from "react-icons/im";
import { useModal } from "../_contexts/ModalContext";

export type ColumnStateType = {
  name: string;
  tempId: string;
  error?: string;
};

function AddNewBoardModal() {
  const [boardName, setBoardName] = useState("");
  const [columnsState, setColumnsState] = useState<ColumnStateType[]>([]);
  const [error, setError] = useState<{ boardName?: string }>({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toggleModal, modal } = useModal();
  const ref = useOutsideClick(() => {
    toggleModal("addNewBoardModal", false);
    setError({});
    setBoardName("");
    setColumnsState([]);
  });

  function handleAddColumn() {
    setColumnsState((prevCols) => [
      ...prevCols,
      { name: "", tempId: crypto.randomUUID() },
    ]);
  }

  function handleUpdateColumn(newName: string, column: ColumnStateType) {
    setColumnsState((prevCols) =>
      prevCols.map((col) =>
        col.tempId === column.tempId ? { ...col, name: newName } : col,
      ),
    );
  }

  function handleRemoveColumn(column: ColumnStateType) {
    setColumnsState((prevCols) =>
      prevCols.filter((col) => col.tempId !== column.tempId),
    );
  }

  async function handleCreateNewBoard() {
    startTransition(async () => {
      const result = await createNewBoard(boardName, columnsState);

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

      if (result?.success) {
        toggleModal("addNewBoardModal", false);
        setError({});
        setBoardName("");
        setColumnsState([]);
      }

      if (result?.boardId) {
        router.push(`/?boardId=${result.boardId}`);
      }
    });
  }

  if (!modal.addNewBoardModal) return null;

  return (
    <>
      {isPending ? (
        <PageSkeleton />
      ) : (
        <div className="fixed inset-0 bg-black/65 dark:bg-black/45"></div>
      )}

      <div ref={ref} className="flex w-full justify-center">
        <div className="dark:bg-dark-grey absolute inset-x-1/2 top-1/2 flex w-[90%] max-w-120 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border-1 border-gray-300 bg-white px-4 py-6 pr-6 shadow-2xl dark:border-gray-800">
          <p className="heading-l mb-6 text-black dark:text-white">
            Add New Board
          </p>
          <label className="body-m text-medium-grey relative mb-6 flex flex-col gap-2 dark:text-white">
            Board Name
            <input
              required
              placeholder="e.g. Web Design"
              className={`body-l ${error.boardName ? "border-red" : "border-light dark:border-dark"} w-full rounded-lg border-1 p-2 text-black dark:text-white`}
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
            {error.boardName && (
              <p className="body-l text-red absolute top-8 right-3">
                {error.boardName}
              </p>
            )}
          </label>
          <p className="body-m text-medium-grey mb-4 dark:text-white">
            Board Columns
          </p>
          <div className="mb-6 flex flex-col gap-4">
            {columnsState.map((column, i) => (
              <AddColumn
                key={i}
                column={column}
                onUpdateColumn={handleUpdateColumn}
                onRemoveColumn={handleRemoveColumn}
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
            onClick={handleCreateNewBoard}
            className="bg-purple hover:bg-purple-hover active:bg-purple-hover cursor-pointer rounded-full p-3 text-[13px] font-bold text-white"
          >
            {!isPending ? (
              <p> Create New Board</p>
            ) : (
              <ImSpinner6 className="mx-auto animate-spin text-xl" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddNewBoardModal;
