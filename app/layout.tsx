import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ngodingpakeai - AI Prompt Assistant",
  description: "Ubah ide kamu menjadi rencana yang bisa dipahami AI tools pilihanmu.",
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
