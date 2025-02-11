import type { Metadata } from "next";
import { Hind } from "next/font/google";
import "../../app/news.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "HIK Fajar Nitro",
  description: "BPR Syariah HIK Fajar Nitro",
};

const hind = Hind({
  subsets: ["latin"],
  variable: "--font-hind",
  weight: ["400", "500", "600", "700"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" className="scroll-smooth">
    // <head></head>
    <Suspense>
      <div className={`${hind.variable} min-h-screen`}>{children}</div>
    </Suspense>
    // </html>
  );
}
