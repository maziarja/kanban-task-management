import { ColumnType } from "@/models/Column";
import { getTasks } from "../_actions/taskActions/getTasks";
import FetchingSubtask from "./FetchingSubtask";

async function Tasks({ columnId }: { columnId: string; column: ColumnType }) {
  const tasks = await getTasks(columnId);

  return (
    <div className="flex flex-col gap-5">
      {tasks.map((task) => {
        return (
          <div
            className="dark:bg-dark-grey w-70 rounded-lg bg-white px-4 py-6 shadow-sm"
            key={task._id}
          >
            <FetchingSubtask task={task} />
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;
