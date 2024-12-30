"use client";
import React, { useEffect, useState } from "react";
// import DOMPurify from "dompurify";
// import CardBerita from "./CardBerita";
import { useSearchParams } from "next/navigation";
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

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 5);
  useEffect(() => {
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

  return (
    <section id="informasi" className="min-h-screen flex items-center">
      <div className="mx-6">
        <div className="flex justify-center items-center w-full ">
          <h1 className=" text-[50px] uppercase  text-center ">Informasi</h1>
        </div>
        <div className="grid md:grid-cols-12 grid-cols-1 gap-2 ">
          <div className="md:col-span-12 border-gray-300 bg-gray-50">
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
