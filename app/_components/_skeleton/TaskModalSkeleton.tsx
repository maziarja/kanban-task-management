"use client";

import { SubtaskType } from "@/models/Subtask";
import { useTheme } from "next-themes";
import { FaEllipsisVertical } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TaskModalSkeleton({ subtasks }: { subtasks: SubtaskType[] | null }) {
  const { theme } = useTheme();
  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Skeleton
          className="animate-pulse py-2"
          width={200}
          baseColor={theme === "dark" ? "#3e3f4e" : ""}
          highlightColor={theme === "dark" ? "#3e3f4e" : ""}
          customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
        />
        <FaEllipsisVertical className="text-medium-grey text-2xl" />
      </div>
      <Skeleton
        className="mb-6 animate-pulse"
        height={100}
        baseColor={theme === "dark" ? "#3e3f4e" : ""}
        highlightColor={theme === "dark" ? "#3e3f4e" : ""}
        customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
      />
      <Skeleton
        className="mb-4 animate-pulse"
        baseColor={theme === "dark" ? "#3e3f4e" : ""}
        highlightColor={theme === "dark" ? "#3e3f4e" : ""}
        customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
      />

      <div className="mb-6 flex flex-col gap-2.5">
        {subtasks &&
          subtasks.map((subtask, i) => {
            return (
              <Skeleton
                key={i}
                className="animate-pulse"
                baseColor={theme === "dark" ? "#3e3f4e" : ""}
                highlightColor={theme === "dark" ? "#3e3f4e" : ""}
                customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
              />
            );
          })}
      </div>
      <div className="mb-3">
        <Skeleton
          className="animate-pulse p-2"
          baseColor={theme === "dark" ? "#3e3f4e" : ""}
          highlightColor={theme === "dark" ? "#3e3f4e" : ""}
          customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
        />
      </div>
    </>
  );
}

export default TaskModalSkeleton;
