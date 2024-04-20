import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/lib/providers/reduxProvider";
import TanstackProvider from "@/lib/providers/tanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Posts",
  description: "Get and track a list of the most relevent posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <TanstackProvider>
          <body
            // className={`${inter.className} p-20 bg-background text-foreground w-screen h-screen`}
            className={`${inter.className}`}
          >
            {children}
          </body>
        </TanstackProvider>
      </ReduxProvider>
    </html>
  );
}
