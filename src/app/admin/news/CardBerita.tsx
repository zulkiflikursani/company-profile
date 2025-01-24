"use client";
import Link from "next/link";
import React, { useState } from "react";
import DOMPurify from "dompurify";
import ConfirmationModal from "@/app/component/ConfirmModal";
import { ImageViewer } from "@/app/component/ImageViewer";

interface CardBeritaProps {
  title: string;
  content: string;
  thumbnail: string;
  width?: number;
  height?: number;
  id: number;
}
const CardBerita = (props: CardBeritaProps) => {
  const sanitizedContent = DOMPurify.sanitize(props.content);

  // 2. Hilangkan tag img
  // const contentWithoutImages = sanitizedContent.replace(/<img[^>]*>/g, "");

  // 3. Potong String dan Tambahkan Elipsis
  // const maxLength = 100;
  // const trimmedContent =
  //   contentWithoutImages.length > maxLength
  //     ? `${contentWithoutImages.substring(0, maxLength)}...`
  //     : contentWithoutImages;
  // 2. Buat elemen div sementara
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = sanitizedContent;

  // 3. Ambil textContent
  const textContent = tempDiv.textContent || tempDiv.innerText;
  const maxLength = 200;
  const trimmedText =
    textContent.length > maxLength
      ? `${textContent.substring(0, maxLength)}...`
      : textContent;
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function deleteBerita(id: number) {
    try {
      const response = await fetch(`/api/news/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Item deleted successfully:", data);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error deleting item:", errorData);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
    setIsModalOpen(false);
  }
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div className=" shadow-md p-4 h-full flex flex-col justify-center items-center w-full ">
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => deleteBerita(props.id)}
        title="Konfirmasi"
        message="Apakah anda yakin apakan menghapus data ini?"
      />
      <div className="flex w-full  justify-start  items-end border-b-2 mb-2">
        <h2 className="text-xl font-bold mb-2">{props.title} </h2>
      </div>
      <div className="grid grid-cols-6 gap-4 w-full h-full items-center justify-center ">
        <div className="md:col-span-1 col-span-2 w-full  h-full border border-gray-300">
          <div className="flex w-full h-full justify-center items-center ">
            <ImageViewer
              imageName={props.thumbnail}
              alt="Gambar Berita"
              width={props.width || 150}
              height={props.height || 150}
              className="object-cover "
            />
          </div>
        </div>
        <div className="md:col-span-5 col-span-4 flex flex-col w-full h-full">
          {/* <div dangerouslySetInnerHTML={{ __html: trimmedContent }} /> */}
          <div className="h-full ">{trimmedText}</div>
          <div className="flex  w-full justify-end gap-2">
            <button
              onClick={handleDeleteClick}
              className="bg-orange-500 rounded-full text-white py-1 text-sm px-4"
            >
              Hapus
            </button>
            <Link
              href={`news/${props.id}`}
              className="bg-primary-light rounded-full text-white py-1 text-sm px-4"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBerita;
