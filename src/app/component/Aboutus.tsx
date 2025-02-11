"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SusunanPengurus from "./SusunanPengurus";
import Visimisi from "./Visimisi";
import { useInView } from "react-intersection-observer";
import { JsonData } from "../types/JsonType";

function Aboutus() {
  const [data, setData] = useState<JsonData>();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });
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
  return (
    <section id="about" ref={ref} className="min-h-screen overflow-hidden">
      <div className="min-h-screen flex justify-center items-center relative">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2 justify-items-center">
          <div className="grid col-span-1">
            <div className="h-full text-justify w-full flex flex-col justify-center md:p-20 p-4 gap-10">
              <h1
                className={`text-center transform transition-all duration-500 ${
                  inView ? "translate-x-0" : "-translate-x-full"
                } md:text-7xl text-4xl text-primary-light font-bold`}
              >
                {data?.aboutUs.title}
              </h1>
              <p
                className={`transform transition-all duration-700 delay-150 opacity-0 translate-y-4 ${
                  inView ? "opacity-100 translate-y-0" : ""
                }`}
              >
                {data?.aboutUs.description}
              </p>
            </div>
          </div>
          <div
            className={`mt-10 grid col-span-1  transform transition-all duration-500 ${
              inView ? "translate-x-0" : "translate-x-full"
            } `}
          >
            <Image
              src={"/image/about/about.png"}
              width={600}
              height={800}
              alt={"Gambar"}
              // className="bg-green-200"
            />
          </div>
        </div>
      </div>
      <Visimisi />
      <SusunanPengurus />
    </section>
  );
}

export default Aboutus;
