"use client";
import { useState } from "react";

interface FormState {
  title: string;
  file: File | null;
  tgl_publish: string;
  authorId: number;
}
interface ApiResponse {
  success: boolean;
  data?: { url: string };
  message?: string;
}

export default function CreatePublish() {
  const [uploadStatus, setUploadStatus] = useState("");
  // const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [form, setForm] = useState<FormState>({
    title: "",
    file: null,
    tgl_publish: "",
    authorId: 1,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm({ ...form, file: e.target.files[0] });
      console.log("file selected");
    } else {
      console.log("No file selected");
      setForm({ ...form, file: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.file) {
      setUploadStatus("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("tgl_publish", form.tgl_publish);
      formData.append("authorId", String(form.authorId));
      formData.append("file", form.file);

      const res = await fetch("/api/publish", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
      }
      const data: ApiResponse = await res.json();

      if (data.success) {
        setForm({ title: "", file: null, tgl_publish: "", authorId: 1 });
        setUploadStatus("Upload successful!");
        // setUploadedFileUrl(data.data?.url || "");
      } else {
        setUploadStatus(`Upload failed: ${data.message}`);
      }
    } catch (error: Error | unknown) {
      console.error(error);
      setUploadStatus(
        `An error occurred during upload: ${(error as Error).message}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="w-full  p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Input Publish</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h1>Input Publish</h1>
          <label>
            <span className="text-gray-700 font-bold">Title:</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2  text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </label>
          <br />
          <label>
            <span className="text-gray-700 font-bold">Title:</span>
            <input
              type="date"
              value={form.tgl_publish}
              onChange={(e) =>
                setForm({ ...form, tgl_publish: e.target.value })
              }
              className="w-full p-2  text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </label>
          <label>
            <span className="text-gray-700 font-bold">File</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2  text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </label>
          <br />

          {uploadStatus && <p>{uploadStatus}</p>}
          <button
            type="submit"
            disabled={!form.file}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
