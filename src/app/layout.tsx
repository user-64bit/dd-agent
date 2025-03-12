import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const geistPoppis = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Don't Die Agent",
  description: "Don't Die Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistPoppis.className}`}>{children}</body>
    </html>
  );
}
