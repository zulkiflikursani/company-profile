import type { Metadata } from "next";
import { Hind } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";

import Footer from "./component/Footer";
import { Providers } from "./Providers";
import AuthProvider from "./api/context/AuthProvide";

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
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={`${hind.variable} antialiased flex-col flex max-w-screen min-h-screen`}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <AuthProvider>
            <Header />
            {children}
            {/* <div className="flex-1 border bottom-1 border-gray-300 my-3"></div> */}
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
