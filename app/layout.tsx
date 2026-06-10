import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Binary Conversion Explorer",
  description: "Interactive binary conversion learning tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}