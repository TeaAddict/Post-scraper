import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/lib/providers/reduxProvider";
import TanstackProvider from "@/lib/providers/tanstackProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
          <body className={`${inter.className}`}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </TanstackProvider>
      </ReduxProvider>
    </html>
  );
}
