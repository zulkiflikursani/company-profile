import CardBeritaSite from "@/app/component/CardBeritaSide";
import { formatDateIndonesia } from "@/app/lib/formatDateIndonesia";
import { getAuthor } from "@/app/lib/getAuthor";
import { getNewsList } from "@/app/lib/getNewsList";
import { getData } from "@/app/lib/NewsData";

interface Post {
  id: number;
  title: string;
  content: string;
  tgl_berita: string;
  thumbnailUrl: string;
}
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
  const author = await getAuthor(post.id.toString());
  const list_berita = await getNewsList();

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
            <p>Author: {author}</p>
            <p>Tanggal publikasi: {formatDateIndonesia(post.tgl_berita)}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
        <div className="md:col-span-3 border-gray-300 border">
          <div className="w-full"></div>
          <h1 className=" text-[20px] text-center font-bold uppercase">
            LIST BERITA
          </h1>
          <div className="w-full">
            {list_berita.data?.map((item: Post) => {
              return (
                <div key={item.id}>
                  <CardBeritaSite
                    title={item.title}
                    content={item.content}
                    id={item.id}
                    thumbnail={item.thumbnailUrl}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
