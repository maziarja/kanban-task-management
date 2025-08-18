"use client";
import { BoardType } from "@/models/Board";
import { TbLayoutBoardSplit } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
// import DarkMode from "./DarkMode";
import { useModal } from "../_contexts/ModalContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import dynamic from "next/dynamic";
const DarkMode = dynamic(() => import("./DarkMode"), { ssr: false });

type DropdownSelectBoardMenuModalProps = {
  boards: BoardType[];
};
function DropdownSelectBoardMenuModal({
  boards,
}: DropdownSelectBoardMenuModalProps) {
  const params = useSearchParams();
  const boardId = params.get("boardId") || boards[0]?._id;
  const { modal, toggleModal } = useModal();
  const numOfBoards = boards.length;

  const ref = useOutsideClick(() => toggleModal("selectBoardModal", false));

  if (!modal.selectBoardModal) return null;

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 top-[60px] bg-black/65 md:top-[80px] dark:bg-black/45"></div>
      <div ref={ref} className="flex justify-center">
        <div className="dark:bg-dark-grey absolute inset-x-1/2 top-20 flex w-[80%] max-w-120 -translate-x-1/2 flex-col rounded-lg bg-white py-6 pr-6 md:top-25">
          <p className="heading-s text-medium-grey mb-6 ml-6">
            ALL BOARDS ({numOfBoards})
          </p>

          <div className="mb-3 flex flex-col">
            {boards.map((board, i) => {
              return (
                <Link
                  href={`/?boardId=${board._id}`}
                  onClick={() => {
                    toggleModal("selectBoardModal", false);
                  }}
                  className={`flex cursor-pointer items-center gap-2 rounded-r-full py-4 pr-8 pl-6 ${boardId === board._id && "bg-purple"} `}
                  key={i}
                >
                  <TbLayoutBoardSplit
                    className={`${boardId === board._id ? "text-white" : "text-medium-grey"} `}
                  />
                  <p
                    className={`${boardId === board._id ? "text-white" : "text-medium-grey"} heading-m`}
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
              toggleModal("selectBoardModal", false);
            }}
            className="text-purple heading-m mb-8 ml-6 flex cursor-pointer items-center gap-2"
          >
            <FaPlus className="text-xs" />
            <p>Create New Board</p>
          </button>
          <div className="ml-6 flex">
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropdownSelectBoardMenuModal;
