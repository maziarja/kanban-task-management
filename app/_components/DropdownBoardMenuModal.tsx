"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useModal } from "../_contexts/ModalContext";

function DropdownBoardMenuModal() {
  const { toggleModal } = useModal();

  const ref = useOutsideClick(() => toggleModal("boardMenuModal", false));

  return (
    <>
      <div className="fixed inset-0"></div>
      <div
        ref={ref}
        className="dark:bg-very-dark-grey absolute top-15 right-6.5 flex w-48 flex-col gap-4 rounded-lg bg-white p-4 shadow-2xl md:top-18"
      >
        <button
          onClick={() => {
            toggleModal("editBoardModal", true);
            toggleModal("boardMenuModal", false);
          }}
          className="body-l text-medium-grey mr-auto cursor-pointer"
        >
          Edit Board
        </button>
        <button
          onClick={() => {
            toggleModal("deleteBoardModal", true);
            toggleModal("boardMenuModal", false);
          }}
          className="body-l text-red mr-auto cursor-pointer"
        >
          Delete Board
        </button>
      </div>
    </>
  );
}

export default DropdownBoardMenuModal;
