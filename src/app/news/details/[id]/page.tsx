import { getData } from "@/app/lib/NewsData";
import Link from "next/link";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id, 10); // Parse string ke number
  const result = await getData(postId);

  if (!result.success) {
    return <p>Error: {result.message}</p>;
  }

  if (!result.data) {
    return <p>Data not found</p>;
  }
  const post = result.data;
  return (
    <div className="mx-4">
      <div className="flex justify-center items-center w-full ">
        <h1 className=" text-[50px] upp text-center ">Informasi</h1>
      </div>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-2 bg-gray-50">
        <div className="md:col-span-9 p-4 min-h-screen border border-gray-300">
          <div className="w-full">
            <h1 className=" text-[40px] font-bold text-left mb-4 leading-tight">
              {post.title}
            </h1>
            <p>Author: Nama Author</p>
            <p>Tanggal publikasi: 22 Desember 2024</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
        <div className="md:col-span-3 border-gray-300 border">
          <div className="w-full"></div>
          <h1 className=" text-[20px] text-center font-bold uppercase">
            Publikasi
          </h1>
          <div className="w-full">
            <ul>
              <li>
                <Link href="/news">Laporan Keuangan Bulan November 2024</Link>
              </li>
              <li>
                <Link href="/news">Laporan Keuangan Bulan Oktober 2024</Link>
              </li>
              <li>
                <Link href="/news">Laporan Keuangan Bulan September 2024</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
