"use client";
import React, { useState } from "react";
import InputText from "../component/InputText";

interface FormData {
  nominal: string;
  Tujuan: string;
  nama: string;
  Tlahir: string;
  tglLahir: string;
  alamat: string;
  noktp: string;
  nohp: string;
  pekerjaan: string;
  penghasilan: string;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({
    nominal: "",
    Tujuan: "",
    nama: "",
    Tlahir: "",
    tglLahir: "",
    alamat: "",
    noktp: "",
    nohp: "",
    pekerjaan: "",
    penghasilan: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Modified handleChange to accept the string directly
  const handleChange = (value: string, field: keyof FormData) => {
    setFormData({ ...formData, [field]: value });
    // Clear the error for this field when the user types
    setFormErrors({ ...formErrors, [field]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors on submit
    setFormErrors({});

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setFormData({
          nominal: "",
          Tujuan: "",
          nama: "",
          Tlahir: "",
          tglLahir: "",
          alamat: "",
          noktp: "",
          nohp: "",
          pekerjaan: "",
          penghasilan: "",
        });
        alert("Form submitted successfully!");
      } else {
        const errorData = await response.json(); // Parse the JSON error response
        if (errorData.errors) {
          // Set the form errors based on the API response
          setFormErrors(errorData.errors);
        } else {
          console.error("Form submission failed:", response.statusText);
          alert("Form submission failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  return (
    <>
      <div className="w-full ">
        <div id="form" className="p-10 w-full flex flex-col">
          <h1 className="text-center text-3xl font-bold">Form Pengajuan</h1>
          <InputText
            label={"Nominal Pembiayaan"}
            value={formData.nominal}
            onChange={(value) => handleChange(value, "nominal")}
          />
          {formErrors.nominal && (
            <p className="text-red-500 text-sm">{formErrors.nominal}</p>
          )}
          <InputText
            label="Tujuan Pembiayan"
            value={formData.Tujuan}
            onChange={(value) => handleChange(value, "Tujuan")}
          />
          {formErrors.Tujuan && (
            <p className="text-red-500 text-sm">{formErrors.Tujuan}</p>
          )}
          <InputText
            label="Nama"
            value={formData.nama}
            onChange={(value) => handleChange(value, "nama")}
          />
          {formErrors.nama && (
            <p className="text-red-500 text-sm">{formErrors.nama}</p>
          )}
          <InputText
            label="Tempat Lahir"
            value={formData.Tlahir}
            onChange={(value) => handleChange(value, "Tlahir")}
          />
          {formErrors.TLahir && (
            <p className="text-red-500 text-sm">{formErrors.TLahir}</p>
          )}
          <InputText
            label="Tanggal Lahir"
            value={formData.tglLahir}
            type="date"
            onChange={(value) => handleChange(value, "tglLahir")}
          />
          {formErrors.tglLahir && (
            <p className="text-red-500 text-sm">{formErrors.tglLahir}</p>
          )}
          <InputText
            label="Alamat"
            value={formData.alamat}
            onChange={(value) => handleChange(value, "alamat")}
          />
          {formErrors.alamat && (
            <p className="text-red-500 text-sm">{formErrors.alamat}</p>
          )}
          <InputText
            label="No. KTP"
            value={formData.noktp}
            onChange={(value) => handleChange(value, "noktp")}
          />
          {formErrors.noktp && (
            <p className="text-red-500 text-sm">{formErrors.noktp}</p>
          )}
          <InputText
            label="Ho. Hp / WhatsApp"
            value={formData.nohp}
            onChange={(value) => handleChange(value, "nohp")}
          />
          {formErrors.nohp && (
            <p className="text-red-500 text-sm">{formErrors.nohp}</p>
          )}
          <InputText
            label=" Pekerjaan "
            value={formData.pekerjaan}
            onChange={(value) => handleChange(value, "pekerjaan")}
          />
          {formErrors.pekerjaan && (
            <p className="text-red-500 text-sm">{formErrors.pekerjaan}</p>
          )}
          <InputText
            label="Penghasilan Bersih"
            value={formData.penghasilan}
            onChange={(value) => handleChange(value, "penghasilan")}
          />
          {formErrors.penghasilan && (
            <p className="text-red-500 text-sm">{formErrors.penghasilan}</p>
          )}
          <div>
            <button
              className="bg-primary rounded-lg hover:bg-green-400 hover:text-black px-5 py-2 mt-2 text-white  "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
