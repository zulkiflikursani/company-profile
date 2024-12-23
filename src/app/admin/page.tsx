import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-[500px] w-full flex items-center flex-col">
      <h3 className="text-4xl font-bold mb-10">Admin Dashboard</h3>
      <div className="grid grid-cols-2 gap-4 text-center">
        <Link
          href={"/admin/create-news"}
          className="bg-primary-light p-4  rounded-lg text-3xl text-gray-100"
        >
          <h3>Input Berita`</h3>
        </Link>
        <Link
          href={"/admin/create-publish"}
          className="bg-primary-light p-4  rounded-lg text-3xl text-gray-100"
        >
          <h3>Input Publish</h3>
        </Link>
      </div>
    </div>
  );
};

export default page;
