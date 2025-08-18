"use client";

import { FaPlus } from "react-icons/fa6";
import { useModal } from "../_contexts/ModalContext";
import { BoardType } from "@/models/Board";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TbLayoutBoardSplit } from "react-icons/tb";
import { IoMdEyeOff } from "react-icons/io";

// import DarkMode from "./DarkMode";
import Image from "next/image";
import { useTheme } from "next-themes";
import logoLight from "@/public/assets/logo-dark.svg";
import logoDark from "@/public/assets/logo-light.svg";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const DarkMode = dynamic(() => import("./DarkMode"), { ssr: false });

function Sidebar({ boards }: { boards: BoardType[] }) {
  const params = useSearchParams();
  const boardId = params.get("boardId") || boards[0]?._id;
  const { modal, toggleModal } = useModal();
  const { theme } = useTheme();
  const numOfBoards = boards.length;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`dark:bg-dark-grey hidden flex-col border-r-1 md:flex ${
        theme === "light" ? "border-light" : "border-dark"
      } bg-white py-6 pr-4 transition-all duration-300 ease-in-out ${modal.sidebar ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none -translate-x-full opacity-0"}`}
    >
      <div className="mt-2 mb-13.5 ml-6">
        {theme === "light" && (
          <Image
            className="hidden md:block"
            src={logoLight}
            height={0}
            width={0}
            alt="Kanban Logo"
          />
        )}
        {theme === "dark" && (
          <Image
            className="hidden md:block"
            src={logoDark}
            height={0}
            width={0}
            alt="Kanban Logo"
          />
        )}
      </div>
      <p className="heading-s text-medium-grey mb-6 ml-6">
        ALL BOARDS ({numOfBoards})
      </p>

      <div className="mb-3 flex flex-col">
        {boards.map((board, i) => {
          return (
            <Link
              key={i}
              href={`/?boardId=${board._id}`}
              className={`${boardId !== board._id && "hover:bg-purple/20 active:bg-purple/20 group dark:hover:bg-white dark:active:bg-white"} hover:text-purple flex cursor-pointer items-center gap-2 rounded-r-full py-4 pr-8 pl-6 ${boardId === board._id && "bg-purple"} `}
            >
              <TbLayoutBoardSplit
                className={` ${boardId === board._id ? "text-white" : "text-medium-grey"} group-hover:text-purple`}
              />
              <p
                className={`${boardId === board._id ? "text-white" : "text-medium-grey"} heading-m group-hover:text-purple`}
              >
                {board.name}
              </p>
            </Link>
          );
        })}
      </div>
      <button
        onClick={() => {
          toggleModal("addNewBoardModal", true);
        }}
        className="text-purple heading-m mb-8 ml-6 flex cursor-pointer items-center gap-2"
      >
        <TbLayoutBoardSplit className="stroke-purple" />
        <FaPlus className="text-xs" />
        <p>Create New Board</p>
      </button>
      <div className="mt-auto mb-8 ml-4 flex">
        <DarkMode />
      </div>
      <button
        className="hover:bg-purple/20 active:bg-purple/20 mb-8 flex cursor-pointer items-center justify-center gap-2 rounded-r-full py-4 pr-8 pl-6 dark:hover:bg-white dark:active:bg-white"
        onClick={() => toggleModal("sidebar", false)}
      >
        <IoMdEyeOff className="fill-medium-grey text-xl" />
        <p className="heading-m text-medium-grey">Hide Sidebar</p>
      </button>
    </div>
  );
}

export default Sidebar;
