"use client";
import { useState } from "react";
import TextEditor from "../../component/TextEditor";

export default function CreateNewsPage() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tgl_berita: "",
    authorid: 1,
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    const response = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("News created successfully!");
      setForm({ title: "", content: "", tgl_berita: "", authorid: 1 });
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  function handleChange(content: string) {
    setForm({ ...form, content: content });
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="w-full  p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Input Berita</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="block mb-2">
            <span className="text-gray-700 font-bold">Title:</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2  text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700 font-bold">Tanggal Berita:</span>
            <input
              type="date"
              value={form.tgl_berita}
              onChange={(e) => setForm({ ...form, tgl_berita: e.target.value })}
              className="w-full p-2  text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700 font-bold">Content:</span>
            <TextEditor onChange={handleChange} />
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
    </div>
  );
}
