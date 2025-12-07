g"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalProviderProps = {
  children: ReactNode;
};

const initialState = {
  selectBoardModal: false,
  taskModal: false,
  boardMenuModal: false,
  editBoardModal: false,
  deleteBoardModal: false,
  addNewBoardModal: false,
  addNewTaskModal: false,
  taskMenuModal: false,
  deleteTaskModal: false,
  editTaskModal: false,
  sidebar: false,
};

type Modal = keyof typeof initialState;

type ModalContextType = {
  toggleModal: (modal: Modal, value?: boolean) => void;
  modal: typeof initialState;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState(initialState);

  function toggleModal(modal: Modal, value?: boolean) {
    setModal((prev) =>
      value === undefined
        ? { ...prev, [modal]: !prev[modal] }
        : { ...prev, [modal]: value },
    );
  }

  return (
    <ModalContext.Provider
      value={{
        toggleModal,
        modal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("Modal Context was used outside of Modal provider");
  return context;
}

export { ModalProvider, useModal };
