import type { Metadata } from "next";
import "@/globals.css";
import { GlobalProvider } from "@/context/AppContext";
import ClientWrapper from "./ClientWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Cypher Notes",
  description:
    "A note taking website to keep the notes secure because they are not just notes, they are thoughts, ideas, and much more.",
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
          <ClientWrapper>
            {children}
            <SpeedInsights />
          </ClientWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
