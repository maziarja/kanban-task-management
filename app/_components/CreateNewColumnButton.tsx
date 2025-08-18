"use client";

import { useModal } from "../_contexts/ModalContext";

function CreateNewColumnButton() {
  const { toggleModal } = useModal();

  return (
    <button
      onClick={() => toggleModal("editBoardModal", true)}
      className="bg-light dark:bg-dark-grey/20 heading-xl text-medium-grey hover:text-purple active:text-purple mt-[31px] flex min-h-[calc(100vh-130px)] w-70 cursor-pointer items-center justify-center rounded-lg"
    >
      + New Column
    </button>
  );
}

export default CreateNewColumnButton;
