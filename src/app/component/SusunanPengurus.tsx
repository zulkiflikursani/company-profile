import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

function SusunanPengurus() {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });
  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col w-full justify-center items-center text-center bg-gray-200"
    >
      <h1 className="text-4xl text-primary-light font-bold mb-10">
        Susunan Pengurus
      </h1>
      <div className="grid md:grid-cols-5 gap-6 grid-cols-1 mx-5">
        <div
          className={`text-center transform transition-all duration-700 delay-300 ${
            inView ? "translate-x-0" : "-translate-x-full"
          } bg-white flex flex-col justify-between items-center px-3 py-6  text-center h-full`}
        >
          <Image
            src="/image/pengurus/1.jpg"
            alt="komisaris utama"
            width="300"
            height="300"
            className="object-cover"
          />
          <div className="flex flex-col h-full">
            <div className="text-lg text-primary-light font-bold">
              Muhammad Nur Alfatah
            </div>
            <div className="text-sm font-bold">Komisaris Utama</div>
          </div>
        </div>
        <div
          className={`text-center transform transition-all duration-700 delay-150 ${
            inView ? "translate-x-0" : "-translate-x-full"
          } bg-white flex flex-col justify-between items-center px-3 py-6  text-center h-full`}
        >
          <Image
            src="/image/pengurus/2.jpg"
            alt="komisaris"
            width="300"
            height="300"
            className="object-cover"
          />
          <div className="flex flex-col h-full">
            <div className="text-lg text-primary-light font-bold">
              Apfin Abdullah
            </div>
            <div className="text-sm font-bold">Komisaris</div>
          </div>
        </div>
        <div className="bg-white flex flex-col justify-between items-center px-3 py-6 text-center h-full">
          <Image
            src="/image/pengurus/3.jpg"
            alt="komisaris"
            width="300"
            height="300"
            className="object-cover"
          />
          <div className="flex flex-col h-full">
            <div className="text-lg text-primary-light font-bold">
              Prof. Dr. H. Muammar Muhammad Bakry, LC., M.Ag
            </div>
            <div className="text-sm font-bold">Dewan Pengawas Syariah</div>
          </div>
        </div>
        <div
          className={`text-center transform transition-all duration-700 delay-150  ${
            inView ? "translate-x-0" : "translate-x-full"
          } bg-white flex flex-col justify-between items-center px-3 py-6  text-center h-full`}
        >
          <Image
            src="/image/pengurus/4.jpg"
            alt="direktur utama"
            width="300"
            height="300"
            className="object-cover"
          />
          <div className="flex flex-col h-full">
            <div className="text-lg text-primary-light font-bold">
              Gusmi Arni Saleh
            </div>
            <div className="text-sm font-bold">Direktur Utama</div>
          </div>
        </div>
        <div
          className={`text-center transform transition-all duration-700 delay-300 ${
            inView ? "translate-x-0" : "translate-x-full"
          } bg-white flex flex-col justify-between items-center px-3 py-6  text-center h-full`}
        >
          <Image
            src="/image/pengurus/5.jpg"
            alt="direktur"
            width="300"
            height="300"
            className="object-cover"
          />
          <div className="flex flex-col h-full">
            <div className="text-lg text-primary-light font-bold">
              Amiruddin
            </div>
            <div className="text-sm font-bold">Direktur</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SusunanPengurus;
