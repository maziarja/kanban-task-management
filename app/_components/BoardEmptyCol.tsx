"use client";

import { useModal } from "../_contexts/ModalContext";

function BoardEmptyCol() {
  const { toggleModal } = useModal();

  return (
    <div className="flex min-h-[calc(100vh-97px)] flex-col items-center justify-center gap-6">
      <p className="heading-l text-medium-grey text-center">
        This board is empty. Create a new column to get started.
      </p>
      <button
        onClick={() => toggleModal("editBoardModal", true)}
        className="bg-purple hover:bg-purple-hover active:bg-purple-hover heading-m cursor-pointer rounded-full px-3 py-3 text-white"
      >
        + Add New Column
      </button>
    </div>
  );
}

export default BoardEmptyCol;
