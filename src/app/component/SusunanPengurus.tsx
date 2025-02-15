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
        {data?.susunanPengurus.title}
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
      </div>
    </div>
  );
}

export default SusunanPengurus;
