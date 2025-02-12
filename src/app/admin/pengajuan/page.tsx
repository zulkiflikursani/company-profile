// app/admin/daftarpengajuan/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
//redeploy
interface Pengajuan {
  id: number;
  nominal: number;
  Tujuan: string;
  nama: string;
  Tlahir: string;
  tglLahir: string;
  alamat: string;
  noktp: string;
  nohp: string;
  pekerjaan: string;
  penghasilan: number;
  createdAt: string;
}

// Helper function to format the date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Or handle the invalid date as you see fit
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

function AdminDaftarPengajuan() {
  const [pengajuanList, setPengajuanList] = useState<Pengajuan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPengajuan, setSelectedPengajuan] = useState<Pengajuan | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/pengajuan");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Pengajuan[] = await response.json();
        setPengajuanList(data);
        setLoading(false);
      } catch (e) {
        let errorMessage = "An unknown error occurred";
        if (e instanceof Error) {
          errorMessage = e.message;
        } else if (typeof e === "string") {
          errorMessage = e;
        }
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    // Confirmation dialog
    if (
      window.confirm("Apakah anda yakin akan menghapus pengajuan Pengajuan?")
    ) {
      try {
        const response = await fetch(`/api/pengajuan/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setPengajuanList((prevList) =>
          prevList.filter((item) => item.id !== id)
        );
        alert("Pengajuan deleted successfully");
      } catch (e) {
        let errorMessage = "An unknown error occurred";
        if (e instanceof Error) {
          errorMessage = e.message;
        } else if (typeof e === "string") {
          errorMessage = e;
        }
        setError(errorMessage);
        alert(`Error deleting Pengajuan: ${errorMessage}`);
      }
    }
  };

  const handleView = (pengajuan: Pengajuan) => {
    setSelectedPengajuan(pengajuan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log(selectedPengajuan);
    setIsModalOpen(false);
    setSelectedPengajuan(null);
  };

  const handlePrint = () => {
    if (modalRef.current) {
      const printContent = modalRef.current.innerHTML;
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Pengajuan</title>
              <style>
                /* Add any styles you want for the print view */
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                td, th { border: 1px solid #ddd; padding: 8px; }
                th { background-color: #f2f2f2; }
                @media print {
                  .no-print {
                    display: none;
                  }
                }
                
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
    closeModal();
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Daftar Pengajuan</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nama</th>
              <th className="py-2 px-4 border-b">Tujuan</th>
              <th className="py-2 px-4 border-b">Nominal</th>
              <th className="py-2 px-4 border-b">No HP</th>
              <th className="py-2 px-4 border-b">Pekerjaan</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pengajuanList.map((pengajuan) => (
              <tr key={pengajuan.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{pengajuan.id}</td>
                <td className="py-2 px-4 border-b">{pengajuan.nama}</td>
                <td className="py-2 px-4 border-b">{pengajuan.Tujuan}</td>
                <td className="py-2 px-4 border-b">
                  {pengajuan.nominal.toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">{pengajuan.nohp}</td>
                <td className="py-2 px-4 border-b">{pengajuan.pekerjaan}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleView(pengajuan)}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded "
                    onClick={() => handleDelete(pengajuan.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedPengajuan && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 print:bg-white print:overflow-visible">
          <div
            className="relative top-20 mx-auto p-8 border w-[95%] md:w-[38rem] shadow-lg rounded-md bg-white print:shadow-none print:border-none print:w-auto"
            ref={modalRef}
          >
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 print:text-black text-center mb-4">
                Detail Pengajuan
              </h3>
              <div className="mt-2 print:text-black">
                <table className="min-w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 font-semibold w-1/3">ID</td>
                      <td className="py-2">:</td>
                      <td className="py-2">{selectedPengajuan.id}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Nama</td>
                      <td className="py-2">:</td>
                      <td className="py-2">{selectedPengajuan.nama}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Tujuan</td>
                      <td className="py-2">:</td>
                      <td className="py-2">{selectedPengajuan.Tujuan}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Nominal</td>
                      <td className="py-2">:</td>
                      <td className="py-2">
                        {selectedPengajuan.nominal.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Tempat Lahir</td>
                      <td className="py-2">:</td>
                      <td className="py-2">{selectedPengajuan.Tlahir}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Tanggal Lahir</td>
                      <td className="py-2">:</td>
                      <td className="py-2">
                        {formatDate(selectedPengajuan.tglLahir)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Alamat</td>
                      <td className="py-2">:</td>
                      <td className="py-2">{selectedPengajuan.alamat}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">No. KTP</td>
                      <td className="py-2">:</td>
                      <td className="py-2">{selectedPengajuan.noktp}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">No. HP</td>
                      <td className="py-2">:</td>
                      <td className="py-2">{selectedPengajuan.nohp}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Pekerjaan</td>
                      <td className="py-2">:</td>
                      <td className="py-2">{selectedPengajuan.pekerjaan}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Penghasilan</td>
                      <td className="py-2">:</td>
                      <td className="py-2">
                        {selectedPengajuan.penghasilan.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="items-center px-4 py-3 flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md  shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 print:hidden no-print"
                  onClick={handlePrint}
                >
                  Print
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md  shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 print:hidden no-print"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDaftarPengajuan;
