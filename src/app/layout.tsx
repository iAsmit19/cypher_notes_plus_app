import type { Metadata } from "next";
import "@/globals.css";
import { GlobalProvider } from "@/context/AppContext";
import ClientWrapper from "./ClientWrapper";
// import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Cypher Notes Plus",
  description:
    "A note taking website to keep the notes secure because they are not just notes, they are thoughts, ideas, and much more.",
  icons: {
    icon: "/favicon.ico",
    shortcut: ".favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#181818",
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
            {/* <SpeedInsights /> */}
          </ClientWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
