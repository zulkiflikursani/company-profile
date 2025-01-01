"use client";
import React, { useEffect, useState } from "react";
// import DOMPurify from "dompurify";
// import CardBerita from "./CardBerita";
import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
import CardPublikasi from "./CardPublikasi";
import Link from "next/link";

interface DataTypePublish {
  id: number;
  title: string;
  url: string;
  // content: string;
  thumbnailUrl: string;
}
const InformasiContent = () => {
  const [dataPublish, setDataPublish] = useState<DataTypePublish[] | null>(
    null
  );
  const [totalPage, setTotalPage] = useState<number>(1); // New state for total pages

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 5);
  const router = useRouter();

  useEffect(() => {
    const fetchDataPublish = async () => {
      const response = await fetch("/api/allpublish?page=" + page, {
        method: "GET", // Mengubah metode menjadi GET
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.success) {
        setDataPublish(data.data);
        setTotalPage(data.totalPage);
      } else {
        console.log(`Error: ${data.message}`);
      }
    };

    fetchDataPublish();
  }, [page]); // Menggunakan array kosong sebagai dependencies

  if (!dataPublish) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="-mt-32">Loading...</p>
      </div>
    );
  }
  if (dataPublish?.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="-mt-32">No data available</p>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", String(newPage));
    router.push(`/admin/publish?${newSearchParams.toString()}`);
  };

  return (
    <section id="informasi" className="min-h-screen flex items-center">
      <div className="mx-6">
        <div className="flex justify-center items-center w-full ">
          <h1 className=" text-[50px] uppercase  text-center ">Informasi</h1>
        </div>
        <div className="grid md:grid-cols-12 grid-cols-1 gap-2 ">
          <div className="md:col-span-12 border-gray-300 min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 gap-1 w-12/12 mx-auto">
              <div className="w-full ">
                <h1 className=" text-[20px] font-bold uppercase text-center ">
                  Publikasi
                </h1>
                <div className="w-full flex justify-end p-3">
                  <Link
                    href={"/admin/create-publish"}
                    className="bg-primary-light rounded-full p-3 text-white"
                  >
                    Buat Publish
                  </Link>
                </div>
                <div className="w-full">
                  {!dataPublish ? (
                    <p>No data available</p>
                  ) : (
                    dataPublish.map((item: DataTypePublish, index: number) => (
                      <div key={index}>
                        <CardPublikasi
                          url={item.url}
                          title={"Publikasi " + (index + 1)}
                          content={item.title}
                          id={item.id}
                        />
                      </div>
                    ))
                  )}
                </div>
                {/* Pagination Buttons */}
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                    (pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded border ${
                          pageNumber === page
                            ? "bg-primary-light text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformasiContent;
