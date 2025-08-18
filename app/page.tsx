import { convertToObject } from "@/config/convertToObject";
import { getBoards } from "./_actions/boardActions/getBoards";
import { BoardType } from "@/models/Board";
import Columns from "./_components/Columns";
import Header from "./_components/Header";
import DropdownSelectBoardMenuModal from "./_components/DropdownSelectBoardMenuModal";
import CreateNewData from "./_components/CreateNewData";
import UpdateBoardModal from "./_components/UpdateBoardModal";
import DeleteBoardModal from "./_components/DeleteBoardModal";
import AddNewBoardModal from "./_components/AddNewBoardModal";
import { getColNameAndId } from "./_actions/columnActions/getColNameAndId";
import AddNewTaskModal from "./_components/AddNewTaskModal";
import Sidebar from "./_components/Sidebar";
import GridClientWrapper from "./_components/GridClientWrapper";
import OpenSidebar from "./_components/OpenSidebar";

// import { deleteAllInitialDate } from "./_actions/temporaryTestActions/deleteAllInitialData";

type PageProps = {
  searchParams: {
    boardId?: string;
    taskId: string | null;
  };
};

async function Page({ searchParams }: PageProps) {
  // await deleteAllInitialDate();
  const boardsDoc = await getBoards();
  const boards = convertToObject(boardsDoc) as BoardType[];
  const { boardId } = await searchParams;

  const colNamesAndIds = await getColNameAndId(boardId || boards[0]?._id);

  return (
    <div>
      <CreateNewData />
      <GridClientWrapper>
        <Sidebar boards={boards} />
        <div>
          <Header boards={boards} numOfCols={colNamesAndIds.length} />
          <div className="min-h-[calc(100vh-97px)] overflow-x-scroll px-4">
            <Columns boards={boards} currentBoardId={boardId} />
          </div>
          <OpenSidebar />
        </div>
      </GridClientWrapper>
      <DropdownSelectBoardMenuModal boards={boards} />
      <UpdateBoardModal boards={boards} boardId={boardId} />
      <DeleteBoardModal boards={boards} boardId={boardId} />
      <AddNewBoardModal />
      <AddNewTaskModal colNamesAndIds={colNamesAndIds} />
    </div>
  );
}

export default Page;
