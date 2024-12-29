import type { Metadata } from "next";
import "@/globals.css";
import { GlobalProvider } from "@/context/AppContext";
import ClientWrapper from "./ClientWrapper";

export const metadata: Metadata = {
  title: "Cypher Notes",
  description:
    "A note taking website to keep the notes secure because they are not just notes, they are tohughts, ideas, and much more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
