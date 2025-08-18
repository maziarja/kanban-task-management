// "use client";
// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useContext,
//   useState,
// } from "react";

// type ModalProviderProps = {
//   children: ReactNode;
// };

// type ModalContextType = {
//   isSelectBoardModalOpen: boolean;
//   setIsSelectBoardModalOpen: Dispatch<SetStateAction<boolean>>;
//   isTaskModalOpen: boolean;
//   setIsTaskModalOpen: Dispatch<SetStateAction<boolean>>;
//   isBoardMenuModalOpen: boolean;
//   setIsBoardMenuModalOpen: Dispatch<SetStateAction<boolean>>;
//   isEditBoardModalOpen: boolean;
//   setIsEditBoardModalOpen: Dispatch<SetStateAction<boolean>>;
//   isDeleteBoardModalOpen: boolean;
//   setIsDeleteBoardModalOpen: Dispatch<SetStateAction<boolean>>;
//   isAddNewBoardModalOpen: boolean;
//   setIsAddNewBoardModalOpen: Dispatch<SetStateAction<boolean>>;
//   isAddNewTaskModalOpen: boolean;
//   setIsAddNewTaskModalOpen: Dispatch<SetStateAction<boolean>>;
//   isTaskMenuModalOpen: boolean;
//   setIsTaskMenuModalOpen: Dispatch<SetStateAction<boolean>>;
//   isDeleteTaskModalOpen: boolean;
//   setIsDeleteTaskModalOpen: Dispatch<SetStateAction<boolean>>;
// };

// const ModalContext = createContext<ModalContextType | undefined>(undefined);

// function ModalProvider({ children }: ModalProviderProps) {
//   const [isSelectBoardModalOpen, setIsSelectBoardModalOpen] = useState(false);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
//   const [isBoardMenuModalOpen, setIsBoardMenuModalOpen] = useState(false);
//   const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
//   const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);
//   const [isAddNewBoardModalOpen, setIsAddNewBoardModalOpen] = useState(false);
//   const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
//   const [isTaskMenuModalOpen, setIsTaskMenuModalOpen] = useState(false);
//   const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
//   return (
//     <ModalContext.Provider
//       value={{
//         isSelectBoardModalOpen,
//         setIsSelectBoardModalOpen,
//         isTaskModalOpen,
//         setIsTaskModalOpen,
//         isBoardMenuModalOpen,
//         setIsBoardMenuModalOpen,
//         isEditBoardModalOpen,
//         setIsEditBoardModalOpen,
//         isDeleteBoardModalOpen,
//         setIsDeleteBoardModalOpen,
//         isAddNewBoardModalOpen,
//         setIsAddNewBoardModalOpen,
//         isAddNewTaskModalOpen,
//         setIsAddNewTaskModalOpen,
//         isTaskMenuModalOpen,
//         setIsTaskMenuModalOpen,
//         isDeleteTaskModalOpen,
//         setIsDeleteTaskModalOpen,
//       }}
//     >
//       {children}
//     </ModalContext.Provider>
//   );
// }

// function useModal() {
//   const context = useContext(ModalContext);
//   if (context === undefined)
//     throw new Error("Modal Context was used outside of Modal provider");
//   return context;
// }

// export { ModalProvider, useModal };
