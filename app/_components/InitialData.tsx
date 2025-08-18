"use client";

import Image from "next/image";
import initialData from "../../data.json";
import logoMobile from "@/public/assets/logo-mobile.svg";
import logoLight from "@/public/assets/logo-dark.svg";
import logoDark from "@/public/assets/logo-light.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import { ImSpinner6 } from "react-icons/im";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function InitialData() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <div className="dark:bg-very-dark-grey fixed inset-0 z-50 animate-pulse bg-white">
      <div className="dark:bg-dark-grey relative flex h-16 items-center justify-between bg-white px-4 py-5 md:h-[81px] lg:h-[97px]">
        <div className="relative flex items-center gap-4">
          <Image
            className="md:hidden"
            src={logoMobile}
            height={0}
            width={0}
            alt="Kanban Logo"
          />
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
          <div
            className={`hidden border-r-1 md:block md:h-[81px] lg:h-[97px] ${theme === "light" ? "border-light" : "border-dark"}`}
          ></div>
          <button className="flex cursor-pointer items-center gap-1">
            <p className="heading-l text-black dark:text-white">
              {initialData.boards[0].name}
            </p>

            <MdKeyboardArrowDown className="text-dark dark:text-medium-grey text-xl" />
          </button>
          <div className="flex items-center gap-4">
            <ImSpinner6 className="animate-spin" />
            <p className="body-l hidden text-black sm:flex dark:text-white">
              Please wait
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-purple disabled:bg-purple-hover flex h-8 w-12 items-center justify-center rounded-full md:hidden">
            <FaPlus className="text-base text-white" />
          </button>
          <button
            className={`bg-purple heading-m disabled:bg-purple-hover disabled:dark:bg-purple/40 hidden items-center justify-center rounded-full px-4 py-2.5 text-white md:flex`}
          >
            + Add New Task
          </button>
          <button>
            <FaEllipsisVertical className="text-medium-grey text-base md:text-xl" />
          </button>
        </div>
      </div>
      <div className="min-h-[calc(100vh-97px)] overflow-hidden px-4">
        <div className="my-4 flex w-max justify-between gap-8">
          {initialData.boards[0].columns.map((column, i) => {
            const numOfTasks = column.tasks.length;
            return (
              <div key={i} className="w-70">
                <div className="mb-4 flex gap-2.5">
                  <div className={`h-[15px] w-[15px] rounded-full`}></div>
                  <p className="heading-s text-medium-grey">
                    {column.name} ({numOfTasks})
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  {column.tasks.map((task, i) => {
                    const completedSubtasks = task.subtasks.filter(
                      (subtask) => subtask.isCompleted === true,
                    ).length;
                    return (
                      <div
                        className="dark:bg-dark-grey w-70 rounded-lg bg-white px-4 py-6 shadow-sm"
                        key={i}
                      >
                        <div className="flex cursor-pointer flex-col gap-2">
                          <p className="heading-m max-w-[280px] text-black dark:text-white">
                            {task.title}
                          </p>
                          <p className="text-medium-grey body-m">
                            {" "}
                            {completedSubtasks} of {task.subtasks.length}{" "}
                            subtasks
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InitialData;
