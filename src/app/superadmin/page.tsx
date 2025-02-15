"use client";
import React, { useState, useEffect } from "react";
import { JsonData } from "@/app/types/JsonType";
import JsonEditor from "./JsonEditor";
import { useSession } from "next-auth/react";
// import fileInfo from "../fileInfo.json";  // Remove this line

export default function Page() {
  const [data, setData] = useState<JsonData | null>(null);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const session = useSession();
  const username = session.data?.user?.username;

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

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // You can add more validation (e.g., email format) here

    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        setSuccess("Reset Password successful! You can now log in.");
      } else {
        const errorData: { message: string } = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("An unexpected error occurred during registration.");
    }
  };

  if (!data) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      {/* {isEditing && ( */}
      <JsonEditor initialData={data} onSubmit={handleUpdate} />
      {/* )} */}
      {/* Display your updated data here */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="flex flex-col mx-7 p-3 my-3 bg-gray-100">
        <h1 className="text-2xl font-bold my-3">Ganti Password</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="mb-4 p-2 rounded border border-gray-300 active:border-primary-light"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          className="mb-4 p-2 rounded border border-gray-300 active:border-primary-light"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Ganti Password
          </button>
        </div>
      </div>
    </div>
  );
}
