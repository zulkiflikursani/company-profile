"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function UpdatePublish({ params }: { params: { id: string } }) {
  const [uploadStatus, setUploadStatus] = useState("");
  const [url, setUrl] = useState("");
  // const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const [form, setForm] = useState<FormState>({
    title: "",
    file: null,
    tgl_publish: "",
    authorId: 1,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const id = params.id;
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/detailpublish?id=${id}`);
        const data = await response.json();

        if (data.success) {
          console.log("data", data.data);
          const apiDate = new Date(data.data.tgl_publish);
          if (isNaN(apiDate.getTime())) {
            console.error("invalid date", data.data.tgl_publish);
          }
          const formattedDate = apiDate.toISOString().split("T")[0];
          setForm({
            ...data.data,
            tgl_publish: formattedDate,
          });
          setUrl(data.data.url);
          //   setForm(data.data);
        } else {
          console.error(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
        setMessage(`An error occurred: ${error as string}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [params.id, router]);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setForm({ ...form, file: e.target.files[0] });
  //     console.log("file selected");
  //   } else {
  //     console.log("No file selected");
  //     setForm({ ...form, file: null });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!form.file) {
    //   setUploadStatus("No file selected");
    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("tgl_publish", form.tgl_publish);
      formData.append("authorId", String(form.authorId));
      formData.append("id", String(params.id));

      // formData.append("file", form.file);

      const res = await fetch("/api/publish/update", {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }
      const data: ApiResponse = await res.json();

      if (data.success) {
        setForm({ title: "", file: null, tgl_publish: "", authorId: 1 });
        setUploadStatus("Update successful!");
        router.push("/admin/publish");

        // setUploadedFileUrl(data.data?.url || "");
      } else {
        setUploadStatus(`Update failed: ${data.message}`);
      }
    } catch (error: Error | unknown) {
      console.error(error);
      setUploadStatus(
        `An error occurred during update: ${(error as Error).message}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="w-full  p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Input Publish</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          // <p>{message}</p>
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
              <div className="mb-2">
                <span className="text-gray-700 font-bold">File</span>
                {/* <div className="w-full text-left my-3"> */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 px-2 text-sm m-4 bg-primary-light text-white rounded-lg  hover:bg-gray-300 hover:text-black"
                  // href={url}
                >
                  Lihat File
                </a>
                {/* </div> */}
              </div>
              {/* <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2  text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              /> */}
            </label>
            <br />

            {uploadStatus && <p>{uploadStatus}</p>}
            {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
            <button
              type="submit"
              disabled={!form.title}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
