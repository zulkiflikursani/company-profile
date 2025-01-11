"use client";
import React, { useState, useEffect } from "react";
import JsonEditorProduct from "./JsonEditorProduct";
import { JsonData } from "@/app/types/JsonType";

function Page() {
  const [data, setData] = useState<JsonData | null>(null);
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
  const handleUpdate = async (updatedData: JsonData) => {
    try {
      const response = await fetch("/api/superadmin/aboutus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result.message);
      setData(updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (!data) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      <JsonEditorProduct initialData={data} onSubmit={handleUpdate} />
    </div>
  );
}

export default Page;
