"use client";
import React, { useEffect, useState } from "react";
import CardBerita from "./CardBerita";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
interface DataType {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
}

function NewsContent() {
  const [data, setData] = useState<DataType[] | null>(null);

  const [totalPage, setTotalPage] = useState<number>(1); // New state for total pages
  // const [totalPagePublish, setTotalPagePublish] = useState<number>(1); // New state for total pages

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1", 10);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/allnews?page=" + page, {
        method: "GET", // Mengubah metode menjadi GET
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.success) {
        setData(data.data);
        setTotalPage(data.totalPage);
      } else {
        console.log(`Error: ${data.message}`);
      }
    };
    fetchData();
  }, [page]);
  if (!data) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="-mt-32">Loading...</p>
      </div>
    );
  }
  if (data?.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="-mt-32">No data available</p>
      </div>
    );
  }
  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", String(newPage));
    router.push(`/news?${newSearchParams.toString()}`);
  };

  return (
    <div className="px-10 w-full">
      <div className="px-10 w-full">
        <div className="flex  w-full justify-center items-center  ">
          <h1 className=" text-[50px] uppercase  text-center ">Informasi</h1>
        </div>
        <div className="w-full bg-gray-50">
          <div className="min-h-screen w-full">
            <div className="w-full ">
              <h1 className=" text-[20px] text-center font-bold uppercase ">
                Daftar Berita
              </h1>
              <div className="w-full flex justify-end p-3">
                <Link
                  href={"/admin/create-news"}
                  className="bg-primary-light rounded-full p-3 text-white"
                >
                  Buat Berita
                </Link>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="w-full items-center">
                {/* <p>Tidak ada data tersedia</p> */}

                {data && Array.isArray(data) && data.length > 0 ? (
                  data.map((item: DataType, index: number) => (
                    <div key={index.toString()} className={` border `}>
                      <CardBerita
                        title={item.title}
                        content={item.content}
                        thumbnail={item.thumbnailUrl}
                        id={item.id}
                      />
                    </div>
                  ))
                ) : (
                  <div className="w-full flex flex-col items-center justify-center min-h-[200px]">
                    <p>Tidak ada data tersedia</p>
                  </div>
                )}
              </div>
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
  );
}

export default NewsContent;
