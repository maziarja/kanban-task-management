import { BoardType } from "@/models/Board";
import { getColumns } from "../_actions/columnActions/getColumns";
import Tasks from "./Tasks";
import Task from "@/models/Task";
import CreateNewColumnButton from "./CreateNewColumnButton";
import { getColor } from "../helpers/getColor";
import BoardEmptyCol from "./BoardEmptyCol";

type ColumnsPageProps = {
  currentBoardId?: string;
  boards: BoardType[];
};

async function Columns({ currentBoardId, boards }: ColumnsPageProps) {
  const boardId = currentBoardId || boards[0]?._id;
  const columns = await getColumns(boardId);

  if (columns.length === 0) return <BoardEmptyCol />;

  return (
    <div className="my-4 flex w-max justify-between gap-8">
      {columns.map(async (column) => {
        const numOfTasks = await Task.countDocuments({ columnId: column._id });

        return (
          <div key={column._id} className="w-70">
            <div className="mb-4 flex gap-2.5">
              <div
                style={{
                  backgroundColor: getColor(column._id),
                }}
                className={`h-[15px] w-[15px] rounded-full`}
              ></div>
              <p className="heading-s text-medium-grey">
                {column.name} ({numOfTasks})
              </p>
            </div>
            <Tasks columnId={column._id} column={column} />
          </div>
        );
      })}
      {columns.length > 0 && <CreateNewColumnButton />}
    </div>
  );
}

export default Columns;
