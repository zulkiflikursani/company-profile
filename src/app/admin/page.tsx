"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-[500px] w-full flex items-center flex-col">
      <h3 className="text-4xl font-bold mb-10">Admin Dashboard</h3>
      <div className="grid grid-cols-2 gap-4 text-center">
        <Link
          href={"/admin/news"}
          className="bg-primary-light p-4  rounded-lg text-3xl text-gray-100"
        >
          <h3>Berita</h3>
        </Link>
        <Link
          href={"/admin/publish"}
          className="bg-primary-light p-4  rounded-lg text-3xl text-gray-100"
        >
          <h3>Publish</h3>
        </Link>
        <button
          onClick={async () => {
            await signOut();
          }}
          className="bg-primary-light p-4  rounded-lg text-3xl text-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default page;
