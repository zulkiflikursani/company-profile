"use client";
import React, { useEffect, useState } from "react";
import { JsonData } from "../types/JsonType";
// import data from "@/app/config/file-content.json";

function Visimisi() {
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
    <div className="grid md:grid-cols-2 gap-4 grid-cols-1 text-xl min-h-screen bg-gray-100">
      <div className="bg-primary-light text-gray-100 md:text-right text-left p-4 min-h-[300px] md:my-64 my-5">
        <div className="font-hind font-bold text-4xl">Visi Kami</div>
        <div>
          {" "}
          {data?.visiMisi.visi.map((item, index) => {
            return (
              <li key={index} style={{ listStyle: "none" }}>
                {item}
              </li>
            );
          })}
        </div>
      </div>
      <div className="bg-primary-light text-gray-100 text-left p-4 min-h-[300px] md:my-64 my-5">
        <div className="font-hind font-bold text-4xl">Misi Kami</div>
        <div className="mx-4">
          <ul className="list-disc">
            {data?.visiMisi.misi.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Visimisi;
