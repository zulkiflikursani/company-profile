"use client";
import React, { useEffect, useState } from "react";
// import DOMPurify from "dompurify";
import CardBerita from "../component/CardBerita";
import { useRouter, useSearchParams } from "next/navigation";
import CardPublikasi from "./CardPublikasi";
interface DataType {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
}

interface DataTypePublish {
  id: number;
  title: string;
  // content: string;
  thumbnailUrl: string;
}
function NewsContent() {
  const [data, setData] = useState<DataType[] | null>(null);
  const [dataPublish, setDataPublish] = useState<DataTypePublish[] | null>(
    null
  );
  const [totalPage, setTotalPage] = useState<number>(1); // New state for total pages
  const [totalPagePublish, setTotalPagePublish] = useState<number>(1); // New state for total pages

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
    const fetchDataPublish = async () => {
      const response = await fetch("/api/allpublish?page=" + page, {
        method: "GET", // Mengubah metode menjadi GET
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.success) {
        setDataPublish(data.data);
        setTotalPagePublish(data.totalPage);
      } else {
        console.log(`Error: ${data.message}`);
      }
    };
    fetchData();
    fetchDataPublish();
  }, [page]); // Menggunakan array kosong sebagai dependencies

  if (!data && !dataPublish) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="-mt-32">Loading...</p>
      </div>
    );
  }
  if (data?.length === 0 && dataPublish?.length === 0) {
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
    <div>
      <div className="mx-4">
        <div className="flex justify-center items-center w-full ">
          <h1 className=" text-[50px] uppercase  text-center ">Informasi</h1>
        </div>
        <div className="grid md:grid-cols-12 grid-cols-1 gap-2 bg-gray-50">
          <div className="md:col-span-6  min-h-screen">
            <div className="w-full ">
              <h1 className=" text-[20px] text-center font-bold uppercase ">
                Berita
              </h1>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-1 gap-1 w-12/12 mx-auto">
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
                  <p>No data available</p>
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
          <div className="md:col-span-6 border-gray-300 bg-gray-50">
            <div className="grid grid-cols-1 gap-1 w-12/12 mx-auto">
              <div className="w-full ">
                <h1 className=" text-[20px] font-bold uppercase text-center ">
                  Publikasi
                </h1>
                <div className="w-full">
                  {!dataPublish ? (
                    <p>No data available</p>
                  ) : (
                    dataPublish.map((item: DataTypePublish, index: number) => (
                      <div key={index}>
                        <CardPublikasi
                          title={"Publikasi " + (index + 1)}
                          content={item.title}
                          id={0}
                        />
                      </div>
                    ))
                  )}

                  {/* <CardPublikasi
                    title={"Publikasi 2"}
                    content={"Laporan Keuangan November 2024"}
                    id={0}
                  />
                  <CardPublikasi
                    title={"Publikasi 1"}
                    content={"Laporan Keuangan Septermber 2024"}
                    id={0}
                  /> */}
                </div>
              </div>
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPagePublish }, (_, i) => i + 1).map(
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
  );
}

export default NewsContent;
