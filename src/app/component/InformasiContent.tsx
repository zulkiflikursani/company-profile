"use client";
import React, { useEffect, useState } from "react";
// import DOMPurify from "dompurify";
import CardBerita from "./CardBerita";
import { useSearchParams } from "next/navigation";
// import Link from "next/link";
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
  url: string;
  // content: string;
  thumbnailUrl: string;
}
const InformasiContent = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [dataPublish, setDataPublish] = useState<DataTypePublish[] | null>(
    null
  );

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 5);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/allnews?page=" + page, {
        method: "GET", // Mengubah metode menjadi GET
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setData(data.data);
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

  return (
    <section id="informasi" className="min-h-screen flex items-center">
      <div className="mx-6">
        <div className="flex justify-center items-center w-full ">
          <h1 className=" text-[50px] uppercase  text-center ">Informasi</h1>
        </div>
        <div className="grid md:grid-cols-12 grid-cols-1 gap-2 ">
          <div className="md:col-span-6 bg-gray-50">
            <div className="w-full ">
              <h1 className=" text-[20px] text-center font-bold uppercase ">
                Berita
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-1 w-12/12 mx-auto">
              {data && Array.isArray(data) && data.length > 0 ? (
                data.map((item: DataType, index: number) => (
                  <div key={index.toString()} className={`  `}>
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
                          url={item.url}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformasiContent;
