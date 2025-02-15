"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { JsonData } from "../types/JsonType";

function Page() {
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
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      {/* <SusunanPengurus /> */}
      <div>
        <h3 className="text-4xl text-primary-light font-bold text-center mb-4">
          {data?.susunanPengurus.title}
        </h3>
      </div>
      {data?.susunanPengurus.pengurus.map((pengurus, index) => (
        <div
          key={index}
          className={`md:w-8/12 w-full p-2 mx-auto flex flex-col md:flex-row  ${
            index % 2 === 0 ? "bg-gray-100" : "bg-none"
          } ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
        >
          <div className={`w-full md:w-1/2 p-2 md:m-2 md:order-none`}>
            <Image
              src={pengurus.img}
              alt={pengurus.name}
              layout="responsive"
              width={500}
              height={500}
              unoptimized
            />
          </div>
          <div className="p-2 w-full md:w-1/2 text-justify">
            <h3 className="text-2xl font-bold">{pengurus.name}</h3>
            <p className="font-bold">{pengurus.position}</p>
            <div dangerouslySetInnerHTML={{ __html: pengurus.description! }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
