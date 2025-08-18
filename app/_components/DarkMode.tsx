"use client";
import { IoIosSunny } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function DarkMode() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-light-grey dark:bg-very-dark-grey mx-auto flex w-full items-center justify-center gap-4 rounded-lg py-4">
      <IoIosSunny className="fill-medium-grey" />
      <div className="bg-purple hover:bg-purple-hover active:bg-purple-hover relative flex items-center rounded-full px-6 py-3">
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`absolute transition-all duration-200 ${theme === "dark" ? "translate-x-1" : "-translate-x-5"} h-4 w-4 cursor-pointer rounded-full bg-white`}
        ></div>
      </div>
      <BsFillMoonStarsFill className="fill-medium-grey" />
    </div>
  );
}

export default DarkMode;
