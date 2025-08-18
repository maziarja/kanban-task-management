"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useModal } from "../_contexts/ModalContext";

function DropdownTaskMenuModal() {
  const { toggleModal } = useModal();

  const ref = useOutsideClick(() => toggleModal("taskMenuModal", false));

  return (
    <>
      <div className="fixed inset-0"></div>
      <div
        ref={ref}
        className="dark:bg-very-dark-grey absolute top-10 -right-10 flex w-48 flex-col gap-4 rounded-lg bg-white p-4 shadow-2xl md:top-18"
      >
        <button
          onClick={() => {
            toggleModal("editTaskModal", true);
            toggleModal("taskModal", false);
            toggleModal("taskMenuModal", false);
          }}
          className="body-l text-medium-grey mr-auto cursor-pointer"
        >
          Edit Task
        </button>
        <button
          onClick={() => {
            toggleModal("deleteTaskModal", true);
            toggleModal("taskModal", false);
            toggleModal("taskMenuModal", false);
          }}
          className="body-l text-red mr-auto cursor-pointer"
        >
          Delete Task
        </button>
      </div>
    </>
  );
}

export default DropdownTaskMenuModal;
