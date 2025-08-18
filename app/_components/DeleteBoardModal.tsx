import Board, { BoardType } from "@/models/Board";
import DeleteBoardModalForm from "./DeleteBoardModalForm";
import { convertToObject } from "@/config/convertToObject";

type DeleteBoardModalProps = {
  boardId?: string;
  boards: BoardType[];
};

async function DeleteBoardModal({ boardId, boards }: DeleteBoardModalProps) {
  const currentBoardDoc = await Board.findById(
    boardId || boards[0]?._id,
  ).lean();

  const currentBoard = convertToObject(currentBoardDoc) as BoardType;

  return <DeleteBoardModalForm currentBoard={currentBoard} />;
}

export default DeleteBoardModal;
