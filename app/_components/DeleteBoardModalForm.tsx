"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useModal } from "../_contexts/ModalContext";
import { BoardType } from "@/models/Board";
import { deleteBoard } from "../_actions/boardActions/deleteBoard";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ImSpinner6 } from "react-icons/im";

type DeleteBoardModalFormProps = {
  currentBoard: BoardType;
};

function DeleteBoardModalForm({ currentBoard }: DeleteBoardModalFormProps) {
  const { modal, toggleModal } = useModal();
  const ref = useOutsideClick(() => toggleModal("deleteBoardModal", false));
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleDeleteBoard() {
    //// Add loading here
    startTransition(async () => {
      const result = await deleteBoard(currentBoard._id);
      if (result.success) {
        toggleModal("deleteBoardModal", false);
        router.push("/");
      }
    });
  }

  if (!modal.deleteBoardModal) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/65 dark:bg-black/45"></div>
      <div ref={ref} className="flex w-full justify-center">
        <div className="dark:bg-dark-grey absolute inset-x-1/2 top-1/2 flex w-[90%] max-w-120 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border-1 border-gray-300 bg-white px-4 py-6 pr-6 shadow-2xl dark:border-gray-800">
          <p className="heading-l text-red mb-6">Delete this board?</p>
          <p className="text-medium-grey body-l mb-6">
            Are you sure you want to delete the &#39;{currentBoard?.name}&#39;
            board?This action will remove all columns and tasks and cannot be
            reversed.
          </p>
          <button
            disabled={isPending}
            onClick={handleDeleteBoard}
            className="bg-red hover:bg-red-hover active:bg-red-hover mb-4 cursor-pointer rounded-full py-3 text-[13px] font-bold text-white"
          >
            {!isPending ? (
              <p>Delete</p>
            ) : (
              <ImSpinner6 className="mx-auto animate-spin text-xl" />
            )}
          </button>
          <button
            onClick={() => toggleModal("deleteBoardModal", false)}
            className="bg-purple/10 text-purple hover:bg-purple-hover/20 active:bg-purple-hover/20 cursor-pointer rounded-full py-3 text-[13px] font-bold dark:bg-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteBoardModalForm;
