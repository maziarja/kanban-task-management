"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Loader({ isInitData = false }) {
  const { theme } = useTheme();

  return (
    <div className="dark:bg-very-dark-grey fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex animate-bounce flex-col items-center justify-center gap-4">
        {
          <Image
            className="dark:hidden"
            src="/assets/logo-dark.svg" // path from public folder
            alt="Logo"
            width={200}
            height={200}
            priority
          />
        }
        {theme === "dark" && (
          <Image
            src="/assets/logo-light.svg" // path from public folder
            alt="Logo"
            width={200}
            height={200}
            priority
          />
        )}
        {isInitData && (
          <p className="text-purple heading-l text-center">
            Please wait while we create the initial data…
          </p>
        )}
      </div>
    </div>
  );
}
