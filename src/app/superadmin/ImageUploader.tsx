import Image from "next/image";
import React, { useState, ChangeEvent, useEffect } from "react";

interface ImageUploaderProps {
  label: string;
  imageUrl?: string;
  id: string | number;
  onImageUpload: (imageUrl: string, id: string | number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  imageUrl = "",
  onImageUpload,
  id,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Handle file upload and generate url here, since we do not need to store it on local state
    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", String(Number(id) + 1));

    try {
      const response = await fetch("/api/superadmin/susunanpengurus/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewUrl(data.imageUrl);
        onImageUpload(data.imageUrl, id);
      } else {
        const errorData = await response.json();
        console.error(
          "Gagal mengunggah gambar:",
          response.statusText,
          errorData
        );
        alert(
          `Gagal mengunggah gambar: ${response.statusText}. ${
            errorData.message ? errorData.message : ""
          }`
        );
      }
    } catch (error) {
      console.error("Kesalahan jaringan atau lainnya:", error);
      alert("Kesalahan jaringan atau lainnya");
    }
  };

  return (
    <div>
      <label
        htmlFor="image"
        className="block text-gray-700 text-sm font-bold mb-2 capitalize"
      >
        {label}:
      </label>
      {previewUrl && (
        <Image
          width={100}
          height={100}
          src={previewUrl}
          alt="Preview"
          className="w-20 h-20 rounded-full object-cover mb-2 border"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default ImageUploader;
