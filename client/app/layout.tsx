import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Tanstackprovider from "@/components/providers/tanstackprovider";

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
      <Tanstackprovider>
        <body className={inter.className}>{children}</body>
      </Tanstackprovider>
    </html>
  );
}
