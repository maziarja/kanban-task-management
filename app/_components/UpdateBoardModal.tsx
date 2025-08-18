import { BoardType } from "@/models/Board";
import { getBoard } from "../_actions/boardActions/getBoard";
import { getColumns } from "../_actions/columnActions/getColumns";
import UpdateBoardForm from "./UpdateBoardForm";
import { cookies } from "next/headers";

type UpdateBoardModalProps = {
  boards: BoardType[];
  boardId: string | undefined;
};

async function UpdateBoardModal({ boardId, boards }: UpdateBoardModalProps) {
  const [currentBoard, columns] = await Promise.all([
    getBoard(boardId || boards[0]?._id),
    getColumns(boardId || boards[0]?._id),
  ]);
  const storedCookie = await cookies();
  const userId = storedCookie.get("userId")?.value;

  return (
    <UpdateBoardForm
      columns={columns}
      boardId={boardId || boards[0]?._id}
      currentBoard={currentBoard}
      userId={userId}
    />
  );
}

export default UpdateBoardModal;
