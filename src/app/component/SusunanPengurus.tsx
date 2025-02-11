import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { JsonData } from "../types/JsonType";

function SusunanPengurus() {
  const [data, setData] = useState<JsonData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/superadmin/aboutus"); // Call new endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: JsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({} as JsonData);
      }
    };
    fetchData();
  }, []);
  const [ref, inView] = useInView({
    threshold: 0.1,
  });
  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col w-full justify-center items-center text-center bg-gray-200"
    >
      <h1 className="text-6xl text-primary-light font-bold mb-10">
        Susunan Pengurus
      </h1>
      <div className="grid md:grid-cols-5 gap-6 grid-cols-1 mx-5">
        {data?.susunanPengurus.pengurus.map((item, index) => {
          return (
            <div
              key={index}
              className={`text-center transform transition-all duration-1000 delay-300 ${
                inView ? "scale-100" : "scale-50"
              } bg-white flex flex-col justify-between items-center px-3 py-6  text-center h-full`}
            >
              <Image
                src={`/image/pengurus/${index + 1}.jpg`}
                alt={`komisaris ${index + 1}`}
                width="300"
                height="300"
                className="object-cover"
              />
              <div className="flex flex-col h-full">
                <div className="text-lg text-primary-light font-bold">
                  {item.name}
                </div>
                <div className="text-sm font-bold">{item.position}</div>
              </div>
            </div>
          );
        })}

        {/* <div
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
        </div> */}
      </div>
    </div>
  );
}

export default SusunanPengurus;
