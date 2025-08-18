"use client";
import logoMobile from "@/public/assets/logo-mobile.svg";
import Image from "next/image";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { BoardType } from "@/models/Board";
import DropdownBoardMenuModal from "./DropdownBoardMenuModal";
import { useModal } from "../_contexts/ModalContext";
import { useTheme } from "next-themes";
import logoLight from "@/public/assets/logo-dark.svg";
import logoDark from "@/public/assets/logo-light.svg";
import { useEffect, useState } from "react";

function Header({
  boards,
  numOfCols,
}: {
  boards: BoardType[];
  numOfCols: number;
}) {
  const { toggleModal, modal } = useModal();
  const searchParams = useSearchParams();
  const boardId = searchParams.get("boardId") || boards[0]?._id;
  const currentBoard = boards.find((board) => board._id === boardId);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <div className="dark:bg-dark-grey relative flex h-16 items-center justify-between bg-white px-4 py-5 md:h-[81px] lg:h-[97px]">
      <div className="flex items-center gap-4">
        <Image
          className="md:hidden"
          src={logoMobile}
          height={0}
          width={0}
          alt="Kanban Logo"
        />
        {theme === "light" && !modal.sidebar && (
          <Image
            className="hidden md:block"
            src={logoLight}
            height={0}
            width={0}
            alt="Kanban Logo"
          />
        )}
        {theme === "dark" && !modal.sidebar && (
          <Image
            className="hidden md:block"
            src={logoDark}
            height={0}
            width={0}
            alt="Kanban Logo"
          />
        )}
        {!modal.sidebar && (
          <div
            className={`hidden border-r-1 md:block md:h-[81px] lg:h-[97px] ${theme === "light" ? "border-light" : "border-dark"}`}
          ></div>
        )}
        <button
          onClick={() => toggleModal("selectBoardModal", true)}
          className={`flex cursor-pointer items-center gap-1 md:cursor-auto`}
        >
          <p className="heading-l text-black dark:text-white">
            {currentBoard?.name}
          </p>

          <div className="md:hidden">
            {!modal.selectBoardModal ? (
              <MdKeyboardArrowDown className="text-dark dark:text-medium-grey text-xl" />
            ) : (
              <MdKeyboardArrowUp className="text-dark dark:text-medium-grey text-xl" />
            )}
          </div>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleModal("addNewTaskModal", true)}
          disabled={numOfCols === 0}
          className="bg-purple disabled:bg-purple-hover disabled:dark:bg-purple/40 flex h-8 w-12 items-center justify-center rounded-full md:hidden"
        >
          <FaPlus
            className={`text-base ${numOfCols === 0 ? "dark:text-medium-grey text-white" : "text-white"} ${numOfCols !== 0 ? "cursor-pointer" : ""}`}
          />
        </button>
        <button
          onClick={() => toggleModal("addNewTaskModal", true)}
          disabled={numOfCols === 0}
          className={`bg-purple heading-m disabled:bg-purple-hover disabled:dark:bg-purple/40 hidden items-center justify-center rounded-full px-4 py-2.5 text-white md:flex ${numOfCols === 0 ? "dark:text-medium-grey text-white" : "text-white"} ${numOfCols !== 0 ? "cursor-pointer" : ""}`}
        >
          + Add New Task
        </button>
        <button
          className="cursor-pointer"
          onClick={() => toggleModal("boardMenuModal")}
        >
          <FaEllipsisVertical className="text-medium-grey text-base md:text-xl" />
        </button>
      </div>
      {modal.boardMenuModal && <DropdownBoardMenuModal />}
    </div>
  );
}

export default Header;
