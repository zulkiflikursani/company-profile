// Di file loader.ts

export async function myLoader({ src }: { src: string }): Promise<string> {
  const fetchData = async () => {
    const res = await fetch(src);
    if (!res.ok) {
      throw new Error("Failed to fetch image");
    }
    const imageBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");
    return `data:${res.headers.get("content-type")};base64,${base64}`;
  };
  return await fetchData();
}
