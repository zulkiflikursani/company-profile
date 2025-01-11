"use client";
import FieldEditor from "@/app/superadmin/FieldEditor";
import React, { FormEvent, useEffect, useState } from "react";
import { JsonData } from "@/app/types/JsonType";

import ArrayEditorProduct from "@/app/superadmin/ArrayEditorProduct";
import ImageUploaderProduct from "@/app/superadmin/ImageUploaderProduct";
import TextEditor from "@/app/component/TextEditor";
interface JsonEditorProps {
  initialData: JsonData;
  onSubmit: (data: JsonData) => void;
}

function JsonEditorProduct({ initialData, onSubmit }: JsonEditorProps) {
  const [form, setForm] = useState<JsonData>(initialData);
  useEffect(() => {
    setForm(initialData);
  }, [initialData]);
  const handleArrayProdukChange = (
    section: keyof JsonData,
    field: string,
    items: { img: string; name: string; description: string; content: string }[]
  ) => {
    setForm((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: items,
      },
    }));
  };
  const handleAddProduct = () => {
    setForm((prevData) => ({
      ...prevData,
      products: {
        ...prevData.products,
        products: [
          ...prevData.products.products,
          { img: "", name: "", description: "", content: "" },
        ],
      },
    }));
  };

  const handleImageUploadProduct = (imageUrl: string, id: string | number) => {
    // console.log("id", id);
    id = Number(id);
    const updatedProducts = [...form.products.products];
    updatedProducts[id] = { ...updatedProducts[id], img: imageUrl };
    setForm({
      ...form,
      products: {
        ...form.products,
        products: updatedProducts,
      },
    });
  };
  const handleRemoveProduct = (index: number) => {
    setForm((prevData) => ({
      ...prevData,
      products: {
        ...prevData.products,
        products: prevData.products.products.filter((_, i) => i !== index),
      },
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };
  return (
    <div className=" bg-gray-500 bg-opacity-75 flex justify-center items-center ">
      <div className="bg-white p-8 rounded shadow-md w-full ">
        <h2 className="text-2xl font-bold mb-4">Product Config</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-100 p-4"
        >
          <ArrayEditorProduct
            label="Data Product"
            items={form.products.products}
            onItemsChange={(items) =>
              handleArrayProdukChange("products", "products", items)
            }
            addItem={() => handleAddProduct()}
            removeItem={handleRemoveProduct}
            renderItem={(item, index, onChange) => (
              <div key={index} className="flex flex-col gap-2">
                <FieldEditor
                  label={`Produk ke - ${index + 1}`}
                  value={item.name}
                  onChange={(value) =>
                    onChange(index, { ...item, name: value })
                  }
                />

                <ImageUploaderProduct
                  label="gambar"
                  imageUrl={item.img}
                  id={index}
                  onImageUpload={handleImageUploadProduct}
                />
                <FieldEditor
                  label={"Deskripsi"}
                  value={item.description}
                  type="textarea"
                  rows={3}
                  onChange={(value) =>
                    onChange(index, { ...item, description: value })
                  }
                />
                <TextEditor
                  initialContent={item.content}
                  onChange={(value) => {
                    onChange(index, { ...item, content: value });
                  }}
                />
              </div>
            )}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JsonEditorProduct;
