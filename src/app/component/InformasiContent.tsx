"use client";
import React, { useEffect, useState } from "react";
// import DOMPurify from "dompurify";
import CardBerita from "./CardBerita";
import { useSearchParams } from "next/navigation";
// import Link from "next/link";
import CardPublikasi from "./CardPublikasi";
import Image from "next/image";
import { motion, useAnimation, useMotionValue } from "framer-motion";
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
  const scale = useMotionValue(1);

  const controls = useAnimation();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/allnews?page=" + page, {
        method: "GET", // Mengubah metode menjadi GET
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      // console.log(data);
      if (data.success) {
        console.log(data.data);
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
    <section id="informasi">
      <div className="mx-6">
        <div className="flex justify-center items-center w-full ">
          <h1 className=" text-[50px] uppercase  text-center font-bold text-primary-light ">
            Informasi
          </h1>
        </div>
        <div className="flex-col justify-center items-center w-full md:px-20 my-14">
          <div className="w-full flex gap-4">
            <div className="relative w-[200px] h-[200px] overflow-hidden">
              <motion.div style={{ scale }} animate={controls}>
                <Image
                  src={"/image/informasi.png"}
                  alt={"informasi"}
                  layout="fill"
                  objectFit="contain"
                />
              </motion.div>
            </div>
            <div className="font-bold flex-col gap-4 ">
              <p className="text-4xl bg-secondary-dark p-5 w-fit rounded-3xl text-white">
                INFORMASI
              </p>
              <p className="text-4xl p-5">PERUBAHAN NAMA</p>
            </div>
          </div>
          <div className="w-full text-center">
            <i className="my-2">Assalamualakum Warahmatullahi Wabarakatuh</i>
            <p>
              Sehubungan dengan penetapan Undang - Undang No.4 tahun 2023
              Tentang Pengembangan dan penguatan Sektor Keuangan (P2SK) sesuai
              Pasal 1 Bagian Kedua Tentang Perbankan, Keputusan Rapat Umum
              Pemegang Saham PT BPRS Harta Insan Karimah pada tanggal 21
              November 2024, sebagaimana tertuang dalam Akta Pernyataan
              Keputusan Rapat Umum Pemegang Saham PT BPRS Harta Insan Karimah
              Fajar Nitro No. 6 Tanggal 2 Desember 2024 yang dibuat oleh Notaris
              Sahabuddin Nur,SH., MKn., dan telah mendapat Persetujuan Perubahan
              Anggaran Dasar sesuai Keputusan Kementerian Hukum dan HAM Republik
              Indonesia No. AHU-0082842.AI--I.01.02 Tahun 2024 Tentang
              Persetujuan Perubahan Anggaran Dasar Perseroan Terbatas PT Bank
              Perekonomian Rakyat Syariah Harta Insan Karimah Fajar Nitro
              tanggal 18 Desember 2024, sehingga selanjutnya nama Perseroan
              menjadi sebagai berikut:
            </p>
          </div>
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-center  w-full mt-4 gap-2 text-2xl">
              <div className="w-96 flex-col text-center p-2">
                <div className="w-full bg-primary-light text-white font-bold ">
                  SEMULA
                </div>
                <div className="text-primary-light border-solid border-2 border-primary-light mt-2 p-2">
                  PT BANK{" "}
                  <span className="font-bold text-primary-light">
                    PEMBIAYAAN
                  </span>{" "}
                  RAKYAT SYARIAH HARTA INSAN KARIMAH FAJAR NITRO (PT BPRS HIK
                  FAJAR NITRO)
                </div>
              </div>
              <div className="w-96 flex-col text-center p-2">
                <div className="w-full bg-secondary-dark text-white font-bold ">
                  MENJADI
                </div>
                <div className="border-solid border-2 border-secondary-dark mt-2 p-2 text-secondary-dark ">
                  PT BANK <span className="font-bold  ">PEREKONOMIAN</span>{" "}
                  RAKYAT SYARIAH HARTA INSAN KARIMAH FAJAR NITRO (PT BPRS HIK
                  FAJAR NITRO)
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <p>
              Demikian pemberitahuan ini kami sampaikan Atas kepercayaan dan
              loyalitas seluruh Nasabah, Kami ucapkan terima kasih
            </p>
            <i className="">Wassalamualaikum Warahmatullahi Wabarakatuh </i>
            <div className="font-bold mt-2">
              <p>Makassar, 14 Januari 2025</p>
              <p>Direksi </p>
              <p>PT BPRS Harta Insan Karimah Fajar Nitro</p>
            </div>
          </div>
          <div className="bg-primary-light w-full text-white font-bold text-center p-2 mt-2">
            PT BPRS Harta Insan Karimah Fajar Nitro berizin dan diawasi oleh
            Otoritas Jasa Keuangan dan Lembaga Penjamin Simpanan
          </div>
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
