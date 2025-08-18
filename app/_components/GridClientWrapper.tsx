"use client";

import { ReactNode } from "react";
import { useModal } from "../_contexts/ModalContext";

function ClientWrapperForGrid({ children }: { children: ReactNode }) {
  const { modal } = useModal();
  return (
    <div
      className={`relative h-dvh md:grid ${
        modal.sidebar
          ? "grid-cols-[260px_minmax(0,1fr)]"
          : "grid-cols-[0px_minmax(0,1fr)]"
      }`}
    >
      {children}
    </div>
  );
}

export default ClientWrapperForGrid;
