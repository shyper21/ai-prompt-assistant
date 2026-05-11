import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptForge AI",
  description: "Ubah ide mentah menjadi prompt dan PRD yang siap dieksekusi AI coding agent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
