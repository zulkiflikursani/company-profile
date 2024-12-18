import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <>
      <nav className=" bg-secondary min-h-10 p-2">
        <div className="flex space-x-3 items-center ml-6">
          <div className="flex space-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-primary-light"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </svg>
            <span className="text-sm">+62853 9941 7738</span>
          </div>
          <div className="flex space-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4 text-primary-light"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="text-sm">Mon-Fri:09.00-15.00 </span>
          </div>
        </div>
      </nav>
      <div className="sticky top-0 backdrop-blur-lg">
        <div className="min-h-1 flex items-center justify-between gap-4">
          <Image
            src="/image/logo.png"
            alt="logo"
            width={260}
            height={60}
            className="m-3"
          />
          <div className="md:flex hidden justify-end gap-5 mx-20 font-bold text-slate-800 text-sm">
            <Link href="#hero">Home</Link>
            <Link href="#about">About us</Link>
            <Link href="#product">Our Product</Link>
            <Link href="#news">News</Link>
            <div className="w-28"></div>
            <Link href="#pembayaran">Pembayaran</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
