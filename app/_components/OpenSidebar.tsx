"use client";

import { useModal } from "../_contexts/ModalContext";
import { IoMdEye } from "react-icons/io";

function OpenSidebar() {
  const { modal, toggleModal } = useModal();

  if (modal.sidebar) return null;

  return (
    <button
      className="bg-purple absolute bottom-15 hidden cursor-pointer rounded-r-full p-4 md:block"
      onClick={() => toggleModal("sidebar", true)}
    >
      <IoMdEye className="text-2xl text-white" />
    </button>
  );
}

export default OpenSidebar;
