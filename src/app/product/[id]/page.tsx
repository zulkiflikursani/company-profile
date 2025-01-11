import React from "react";
import data from "@/app/config/file-content.json";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = await params.then((params) => params.id);
  const item = data.products.products[parseInt(id, 10)];

  return (
    <div className="w-10/12 mx-auto ">
      <div className="w-full">
        <h3 className="font-bold text-5xl text-primary text-center my-7">
          {item.name}
        </h3>
      </div>
      <div className="grid grid-cols-4">
        <div
          dangerouslySetInnerHTML={{
            __html: data.products.products[parseInt(id, 10)].content,
          }}
          className="col-span-2"
        ></div>
        <div className="col-span-2">
          <Image
            src={item.img}
            layout="relative"
            width={500}
            height={500}
            alt={item.name}
          />
        </div>
      </div>
    </div>
  );
}
