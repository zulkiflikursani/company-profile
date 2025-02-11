"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import MobileMenu from "./MobileMenu"; // Import MobileMenu component
import { JsonData } from "../types/JsonType";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<JsonData>();

  const dropdownRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for the mobile menu
  const session = useSession();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/superadmin/aboutus"); // Call new endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: JsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({} as JsonData);
      }
    };
    fetchData();
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-secondary min-h-10 p-2 relative z-10">
        <div className="flex space-x-3 items-center md:ml-12 mx-2">
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
            <span className="text-sm">{data?.moreinfo.nohp}</span>
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
            <span className="text-sm">{data?.moreinfo["jam-operasi"]}</span>
          </div>
        </div>
      </nav>
      <nav className="sticky top-0 backdrop-blur-lg z-20 pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gray-300 after:shadow-md mb-4 min-h-10">
        <div className="min-h-10 md:mx-12 mx-2 flex items-center justify-between gap-4">
          <Image
            src="/image/logo.png"
            alt="logo"
            width={260}
            height={60}
            className="my-3"
          />
          <button
            onClick={toggleMobileMenu}
            className="md:hidden  p-2 focus:outline-none relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="md:flex hidden justify-end gap-5 font-bold text-slate-800 text-sm">
            {session.data?.user ? (
              <Link href="/admin">Admin Dashboard</Link>
            ) : (
              ""
            )}
            <Link href="/#hero">Home</Link>
            <Link href="/pengurus">Pengurus</Link>
            <Link href="/#about">About us</Link>
            <Link href="/#product">Our Product</Link>
            <div
              className="relative inline-block"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1">
                <Link href="/#informasi">Informasi</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute top-full left-0 bg-white shadow-md mt-0 rounded-md w-40 z-30 ">
                  <Link
                    href="/news"
                    className="block py-2 px-4 hover:bg-gray-100"
                  >
                    Berita
                  </Link>
                  <Link
                    href="/news"
                    className="block py-2 px-4 hover:bg-gray-100"
                  >
                    Publikasi
                  </Link>
                </div>
              )}
            </div>
            <div className="w-28"></div>
            <Link href="/pengajuan">Pembiayaan</Link>
          </div>
        </div>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      </nav>
    </>
  );
}

export default Header;
