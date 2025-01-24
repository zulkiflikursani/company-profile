import React, { useState, useEffect, FormEvent } from "react";
import { JsonData } from "@/app/types/JsonType";
import FieldEditor from "./FieldEditor";
import ArrayEditor from "./ArrayEditor";
import PengurusArrayEditorWithImage from "./ArraySususnanPengurus";
import ImageUploader from "./ImageUploader";
import ArrayEditorProduct from "./ArrayEditorProduct";
import ImageUploaderProduct from "./ImageUploaderProduct";
import ImageUploaderLogo from "./ImageUploaderLogo";

interface JsonEditorProps {
  initialData: JsonData;
  onSubmit: (data: JsonData) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<JsonData>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);
  const handleArrayChange = (
    section: keyof JsonData,
    field: string,
    items: string[]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: items,
      },
    }));
  };
  const handleArrayProdukChange = (
    section: keyof JsonData,
    field: string,
    items: { img: string; name: string; description: string }[]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: items,
      },
    }));
    console.log("change product", formData);
  };
  const handleSusunanPengurusArrayChange = (
    section: keyof JsonData,
    field: string,
    value: {
      img: string;
      name: string;
      position: string;
      description: string;
    }[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      susunanPengurus: {
        ...prev.susunanPengurus,
        title: field,
        pengurus: value,
      },
    }));
  };

  const handleFieldChange = (
    section: keyof JsonData,
    field: string,
    value: string
  ) => {
    setFormData((prevData: JsonData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleAddMisi = () => {
    setFormData((prevData) => ({
      ...prevData,
      visiMisi: {
        ...prevData.visiMisi,
        misi: [...prevData.visiMisi.misi, ""],
      },
    }));
  };
  const handleAddProduct = () => {
    setFormData((prevData) => ({
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
  const handlePengurusTitleChange = (value: string) => {
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      susunanPengurus: { ...prev.susunanPengurus, title: value },
    }));
  };
  const handleAddSusunanPengurus = () => {
    setFormData((prevData) => ({
      ...prevData,
      susunanPengurus: {
        ...prevData.susunanPengurus,
        pengurus: [
          ...prevData.susunanPengurus.pengurus,
          { img: "", name: "", position: "", description: "" },
        ],
      },
    }));
  };
  const handleRemoveProduct = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      products: {
        ...prevData.products,
        products: prevData.products.products.filter((_, i) => i !== index),
      },
    }));
  };

  const handleRemoveSusunanPengurus = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      susunanPengurus: {
        ...prevData.susunanPengurus,
        pengurus: prevData.susunanPengurus.pengurus.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };
  const handleImageUpload = (imageUrl: string, id: string | number) => {
    // console.log("id", id);
    id = Number(id);
    const updatedPengurus = [...formData.susunanPengurus.pengurus];
    updatedPengurus[id] = { ...updatedPengurus[id], img: imageUrl };
    setFormData({
      ...formData,
      susunanPengurus: {
        ...formData.susunanPengurus,
        pengurus: updatedPengurus,
      },
    });
  };
  const handleImageUploadLogo = (imageUrl: string) => {
    setFormData({
      ...formData,
      logo: {
        ...formData.logo,
        imgurl: imageUrl,
      },
    });
  };
  const handleImageUploadProduct = (imageUrl: string, id: string | number) => {
    // console.log("id", id);
    id = Number(id);
    const updatedProducts = [...formData.products.products];
    updatedProducts[id] = { ...updatedProducts[id], img: imageUrl };
    setFormData({
      ...formData,
      products: {
        ...formData.products,
        products: updatedProducts,
      },
    });
  };

  const handleRemoveMisi = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      visiMisi: {
        ...prevData.visiMisi,
        misi: prevData.visiMisi.misi.filter((_, i) => i !== index),
      },
    }));
  };
  const handleRemoveVisi = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      visiMisi: {
        ...prevData.visiMisi,
        visi: prevData.visiMisi.visi.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className=" bg-gray-500 bg-opacity-75 flex justify-center items-center ">
      <div className="bg-white p-8 rounded shadow-md w-full ">
        <h2 className="text-2xl font-bold mb-4">Website Config</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-100 p-4"
        >
          <h3 className="text-xl font-semibold mb-2 capitalize">Logo</h3>
          <ImageUploaderLogo
            label="Logo"
            imageUrl={formData.logo.imgurl}
            id={""}
            onImageUpload={handleImageUploadLogo}
          />
        </form>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-100 p-4"
        >
          <h3 className="text-xl font-semibold mb-2 capitalize">About Us</h3>
          <FieldEditor
            label="Title"
            value={formData.aboutUs.title}
            onChange={(value) => handleFieldChange("aboutUs", "title", value)}
          />
          <FieldEditor
            label="Description"
            value={formData.aboutUs.description}
            onChange={(value) =>
              handleFieldChange("aboutUs", "description", value)
            }
            type="textarea"
            rows={3}
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
        <hr className="border-t border-gray-300 my-4" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <h3 className="text-xl font-semibold mb-2 capitalize">Visi Misi</h3>
          <FieldEditor
            label="Title"
            value={formData.visiMisi.title}
            onChange={(value) => handleFieldChange("visiMisi", "title", value)}
          />
          <ArrayEditor
            label="Visi"
            items={formData.visiMisi.visi}
            onItemsChange={(items) =>
              handleArrayChange("visiMisi", "visi", items)
            }
            addItem={() => handleAddMisi()}
            removeItem={handleRemoveVisi}
            renderItem={(item, index, onChange) => (
              <FieldEditor
                key={index}
                label={`Visi ke - ${index + 1}`}
                value={item}
                onChange={(value) => onChange(index, value)}
              />
            )}
          />
          <ArrayEditor
            label="Misi"
            items={formData.visiMisi.misi}
            onItemsChange={(items) =>
              handleArrayChange("visiMisi", "misi", items)
            }
            addItem={() => handleAddMisi()}
            removeItem={handleRemoveMisi}
            renderItem={(item, index, onChange) => (
              <FieldEditor
                key={index}
                label={`Misi ke - ${index + 1}`}
                value={item}
                onChange={(value) => onChange(index, value)}
              />
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
        <hr className="border-t border-gray-300 my-4" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-100 p-4"
        >
          <h3 className="text-xl font-semibold mb-2 capitalize">
            Susunan Pengurus
          </h3>

          <div className="p-2">
            <FieldEditor
              label="Title"
              value={formData.susunanPengurus.title}
              onChange={(value) =>
                handleFieldChange("susunanPengurus", "title", value)
              }
            />
          </div>

          <PengurusArrayEditorWithImage
            label="Susunan Pengurus"
            title={formData.susunanPengurus.title}
            onTitleChange={handlePengurusTitleChange}
            items={formData.susunanPengurus.pengurus}
            onItemsChange={(items) =>
              handleSusunanPengurusArrayChange(
                "susunanPengurus",
                "pengurus",
                items
              )
            }
            addItem={() => handleAddSusunanPengurus()}
            removeItem={handleRemoveSusunanPengurus}
            renderItem={(item, index, onChange) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <ImageUploader
                    label={`Gambar Pengurus ke - ${index + 1}`}
                    imageUrl={item.img}
                    id={index}
                    onImageUpload={handleImageUpload}
                  />
                </div>
                <FieldEditor
                  label="Name"
                  value={item.name}
                  onChange={(value) =>
                    onChange(index, { ...item, name: value })
                  }
                />
                <FieldEditor
                  label="Position"
                  value={item.position}
                  onChange={(value) =>
                    onChange(index, { ...item, position: value })
                  }
                />
                <FieldEditor
                  label="Description"
                  value={item.description}
                  type="textarea"
                  rows={6}
                  onChange={(value) =>
                    onChange(index, { ...item, description: value })
                  }
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
        <hr className="border-t border-gray-300 my-4" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <h3 className="text-xl font-semibold mb-2 capitalize">Product</h3>
          <FieldEditor
            label="Judul"
            value={formData.products.title}
            onChange={(value) => {
              setFormData((prevData) => {
                return {
                  ...prevData,
                  products: {
                    ...prevData.products,
                    title: value,
                  },
                };
              });
            }}
          />
          <FieldEditor
            label="Deskripsi"
            value={formData.products.description}
            type="textarea"
            rows={3}
            onChange={(value) => {
              setFormData((prevData) => {
                return {
                  ...prevData,
                  products: {
                    ...prevData.products,
                    description: value,
                  },
                };
              });
            }}
          />
          <ArrayEditorProduct
            label="Data Product"
            items={formData.products.products}
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

        <hr className="border-t border-gray-300 my-4 " />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 bg-gray-100"
        >
          <h3 className="text-xl font-semibold mb-2 capitalize">More Info</h3>

          <FieldEditor
            label="Alamat"
            value={formData.moreinfo.alamat}
            onChange={(value) => handleFieldChange("moreinfo", "alamat", value)}
          />
          <FieldEditor
            label="No HP"
            value={formData.moreinfo.nohp}
            onChange={(value) => handleFieldChange("moreinfo", "nohp", value)}
          />
          <FieldEditor
            label="jam-operasi"
            value={formData.moreinfo["jam-operasi"]}
            onChange={(value) =>
              handleFieldChange("moreinfo", "jam-operasi", value)
            }
          />
          <FieldEditor
            label="email"
            value={formData.moreinfo.email}
            onChange={(value) => handleFieldChange("moreinfo", "email", value)}
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
};

export default JsonEditor;
