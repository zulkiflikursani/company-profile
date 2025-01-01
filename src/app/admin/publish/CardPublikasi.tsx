import Image from "next/image";
import React, { useState } from "react";
import DOMPurify from "dompurify";
import ConfirmationModal from "@/app/component/ConfirmModal";
interface CardPublikasiProps {
  title: string;
  content: string;
  thumbnail?: string;
  url: string;
  width?: number;
  height?: number;
  id: number;
}

const CardPublikasi = (props: CardPublikasiProps) => {
  const sanitizedContent = DOMPurify.sanitize(props.content);
  const DEFAULT_IMAGE_URL = "/image/default-thumbnail.jpg";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = sanitizedContent;

  const textContent = tempDiv.textContent || tempDiv.innerText;
  const maxLength = 200;
  const trimmedText =
    textContent.length > maxLength
      ? `${textContent.substring(0, maxLength)}...`
      : textContent;
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function deletePublish(id: number) {
    try {
      const response = await fetch(`/api/publish/delete`, {
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
        onConfirm={() => deletePublish(props.id)}
        title="Konfirmasi"
        message="Apakah anda yakin apakan menghapus data ini?"
      />
      <div className="flex w-full  justify-start  items-end border-b-2 mb-2">
        <h2 className="text-xl font-bold mb-2">{props.title}</h2>
      </div>
      <div className="grid grid-cols-6 gap-4 w-full h-full items-center justify-center ">
        <div className="md:col-span-1 col-span-2 w-full  h-full border border-gray-300">
          <div className="flex w-full h-full justify-center items-center ">
            <Image
              src={props.thumbnail ? props.thumbnail : DEFAULT_IMAGE_URL}
              alt="Gambar Berita"
              width={props.width || 150}
              height={props.height || 150}
              className="object-cover "
            />
          </div>
        </div>
        <div className="md:col-span-5 col-span-4 flex flex-col w-full h-full">
          <div className="h-full ">{trimmedText}</div>
          <div className="flex  w-full justify-end gap-2">
            <button
              onClick={handleDeleteClick}
              className="bg-orange-500 rounded-full text-white py-1 text-sm px-4"
            >
              Hapus
            </button>
            <a
              href={"/admin/publish/" + props.id}
              target="_blank"
              className="bg-primary-light rounded-full text-white py-1 text-sm px-4"
            >
              Edit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPublikasi;
