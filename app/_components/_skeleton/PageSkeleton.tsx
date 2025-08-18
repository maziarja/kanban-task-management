"use client";

import { useTheme } from "next-themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PageSkeleton() {
  const { theme } = useTheme();
  return (
    <div className="dark:bg-very-dark-grey fixed inset-0 min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <Skeleton
          height={32}
          width={200}
          borderRadius={8}
          className="animate-pulse"
          baseColor={theme === "dark" ? "#3e3f4e" : ""}
          highlightColor={theme === "dark" ? "#3e3f4e" : ""}
          customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
        />
        <Skeleton
          height={40}
          width={120}
          borderRadius={8}
          className="animate-pulse"
          baseColor={theme === "dark" ? "#3e3f4e" : ""}
          highlightColor={theme === "dark" ? "#3e3f4e" : ""}
          customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
        />
      </div>

      {/* 3 Columns beside each other */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, colIndex) => (
          <div key={colIndex} className="space-y-4">
            {/* Column title */}
            <Skeleton
              className="mb-4 animate-pulse"
              height={24}
              width={150}
              baseColor={theme === "dark" ? "#3e3f4e" : ""}
              highlightColor={theme === "dark" ? "#3e3f4e" : ""}
              customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
              borderRadius={6}
            />

            {/* Cards inside column */}

            {[...Array(4)].map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="dark:bg-dark-grey space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700"
              >
                <Skeleton
                  height={20}
                  width="80%"
                  borderRadius={4}
                  className="animate-pulse"
                  baseColor={theme === "dark" ? "#3e3f4e" : ""}
                  highlightColor={theme === "dark" ? "#3e3f4e" : ""}
                  customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
                />
                <Skeleton
                  height={16}
                  width="60%"
                  borderRadius={4}
                  className="animate-pulse"
                  baseColor={theme === "dark" ? "#3e3f4e" : ""}
                  highlightColor={theme === "dark" ? "#3e3f4e" : ""}
                  customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
                />
                <Skeleton
                  height={16}
                  width="70%"
                  borderRadius={4}
                  className="animate-pulse"
                  baseColor={theme === "dark" ? "#3e3f4e" : ""}
                  highlightColor={theme === "dark" ? "#3e3f4e" : ""}
                  customHighlightBackground={theme === "dark" ? "#828fa3" : ""}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
