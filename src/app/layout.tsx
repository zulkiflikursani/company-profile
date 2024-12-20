import type { Metadata } from "next";
import { Hind } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";
import Hero from "./component/Hero";
import Aboutus from "./component/Aboutus";
import Products from "./component/Products";
import Footer from "./component/Footer";

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
    <html lang="en" className="scroll-smooth">
      <head></head>
      <body className={`${hind.variable} antialiased `}>
        <Header />
        <Hero />
        <Aboutus />
        <Products />
        <Footer />
        {children}
      </body>
    </html>
  );
}
