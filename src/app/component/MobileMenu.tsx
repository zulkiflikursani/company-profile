"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const session = useSession();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 w-64 bg-white h-screen shadow-md transform transition-transform duration-300 ease-in-out z-[9999] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b-2 border-gray-200">
        <h2 className="text-lg font-semibold">Menu</h2>
      </div>
      <nav className="flex flex-col p-4">
        {session.data?.user ? (
          <Link
            href="/admin"
            onClick={onClose}
            className="block py-2 px-4 hover:bg-gray-100"
          >
            Admin Dashboard
          </Link>
        ) : (
          ""
        )}
        <Link
          href="/#hero"
          onClick={onClose}
          className="block py-2 px-4 hover:bg-gray-100"
        >
          Home
        </Link>
        <Link
          href="/#about"
          onClick={onClose}
          className="block py-2 px-4 hover:bg-gray-100"
        >
          About us
        </Link>
        <Link
          href="/#product"
          onClick={onClose}
          className="block py-2 px-4 hover:bg-gray-100"
        >
          Our Product
        </Link>
        <div className="flex flex-col">
          <Link
            href="/news"
            onClick={onClose}
            className="block py-2 px-4 hover:bg-gray-100"
          >
            Berita
          </Link>
          <Link
            href="/news"
            onClick={onClose}
            className="block py-2 px-4 hover:bg-gray-100"
          >
            Publikasi
          </Link>
        </div>
        <Link
          href="/#pembayaran"
          onClick={onClose}
          className="block py-2 px-4 hover:bg-gray-100"
        >
          Pembayaran
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
