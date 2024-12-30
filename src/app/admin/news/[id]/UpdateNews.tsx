"use client";
import { useEffect, useState } from "react";
import TextEditor from "@/app/component/TextEditor";
import { useRouter } from "next/navigation";

interface FormData {
  id: number;
  title: string;
  content: string;
  tgl_berita: string;
  authorId: number;
}

export default function UpadateNewsPage({
  params,
}: {
  params: { id: string };
}) {
  const [form, setForm] = useState<FormData>({
    id: 0,
    title: "",
    content: "",
    tgl_berita: "",
    authorId: 1,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/news/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("News updated successfully!");
        setForm({
          id: 0,
          title: "",
          content: "",
          tgl_berita: "",
          authorId: 1,
        });
        router.push("/admin/news");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error as string}`);
    }
  };

  useEffect(() => {
    const id = params.id;
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/detail?id=${id}`);
        const data = await response.json();

        if (data.success) {
          console.log("data", data.data);
          const apiDate = new Date(data.data.tgl_berita);
          if (isNaN(apiDate.getTime())) {
            console.error("invalid date", data.data.tgl_berita);
          }
          const formattedDate = apiDate.toISOString().split("T")[0];
          setForm({
            ...data.data,
            tgl_berita: formattedDate,
          });
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

  function handleChange(content: string) {
    setForm((prevForm) => ({ ...prevForm, content }));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Input Berita</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="block mb-2">
              <span className="text-gray-700 font-bold">Title:</span>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    title: e.target.value,
                  }))
                }
                className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700 font-bold">Tanggal Berita:</span>
              <input
                type="date"
                value={form.tgl_berita}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    tgl_berita: e.target.value,
                  }))
                }
                className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700 font-bold">Content:</span>
              <TextEditor
                onChange={handleChange}
                initialContent={form.content}
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
        </div>
      )}
    </div>
  );
}
