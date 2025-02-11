"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { JsonData } from "../types/JsonType";

interface PropsType {
  className?: string;
}
function Hero({ className }: PropsType) {
  // const [data, setData] = useState<JsonData>();
  const [dataWa, setDataWa] = useState("");

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
        const wa = jsonData.moreinfo.nohp.replace(/[-+\s]/g, "");

        setDataWa(wa);
        // setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setData({} as JsonData);
      }
    };
    fetchData();
  }, []);
  return (
    <section
      id="hero"
      ref={ref}
      className={`relative h-screen w-full md:-mt-50 flex flex-col -mt-32 justify-center items-center ${className}`}
    >
      {/* Background Image dengan Opacity */}
      <div
        className="absolute inset-0 bg-hero-pattern bg-cover md:bg-right bg-no-repeat"
        style={{ opacity: 0.5, zIndex: -1 }}
      ></div>

      {/* Konten Text dan Button */}
      <div className="relative z-10 w-full flex flex-col justify-center items-center">
        <div className="text-primary-light md:text-6xl flex flex-col items-center text-[50px] font-bold  font-hind -mt-50 tracking-tight">
          <div
            className={`text-center transform transition-all duration-500 ${
              inView ? "scale-100" : "scale-50"
            }`}
          >
            PEMBIAYAAN{" "}
            <span className="text-secondary-light  md:text-[70px] hidden md:inline">
              |
            </span>{" "}
            TABUNGAN{" "}
            <span className="text-secondary-light md:text-[70px] hidden md:inline">
              |
            </span>{" "}
            DEPOSITO
          </div>
          <div
            className={`tracking-normal text-primary-light text-center font-bold text-3xl transform transition-all duration-700 delay-150 opacity-0 translate-y-4 ${
              inView ? "opacity-100 translate-y-0" : ""
            }`}
          >
            Syariah dan Amanah
          </div>
        </div>
        <div className="w-full flex justify-start">
          <a
            className={`bg-primary-light md:ml-20 mx-auto text-white py-3 px-6 mt-10 rounded-full transform transition-all duration-300  ${
              inView ? "scale-105" : ""
            } `}
            href={`https://wa.me/${dataWa}`}
          >
            Book a consultation
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
