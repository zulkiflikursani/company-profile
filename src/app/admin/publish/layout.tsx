import type { Metadata } from "next";
import { Hind } from "next/font/google";

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
  return <div className={`${hind.variable} antialiased`}>{children}</div>;
}
