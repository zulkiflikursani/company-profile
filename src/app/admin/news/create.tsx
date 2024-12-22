import { useState } from "react";

export default function CreateNews() {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/news/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, authorId: 1 }),
    });

    const data = await res.json();
    if (data.success) alert("News created successfully!");
    else alert("Error: " + data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create News</h1>
      <label>
        Title:
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </label>
      <br />
      <label>
        Content:
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
