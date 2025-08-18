import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ModalProvider } from "./_contexts/ModalContext";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Kanban task management",
  description: "A simple and visual tool to organize tasks",
};

const plusJarkartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  taskModal,
}: Readonly<{
  children: React.ReactNode;
  taskModal: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${plusJarkartaSans.className} bg-light-grey dark:bg-very-dark-grey antialiased`}
      >
        <ThemeProvider
          attribute="data-mode"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            {taskModal}
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
