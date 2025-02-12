// app/admin/daftarpengajuan/page.tsx
"use client";

import React, { useState, useEffect } from "react";

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

function AdminDaftarPengajuan() {
  const [pengajuanList, setPengajuanList] = useState<Pengajuan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPengajuan, setSelectedPengajuan] = useState<Pengajuan | null>(
    null
  ); // State for selected Pengajuan
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

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
        // Remove type any
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
    try {
      const response = await fetch(`/api/pengajuan/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Optimistically update the UI by removing the deleted item
      setPengajuanList(pengajuanList.filter((item) => item.id !== id));
      alert("Pengajuan deleted successfully");
    } catch (e) {
      // Remove type any
      let errorMessage = "An unknown error occurred";
      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === "string") {
        errorMessage = e;
      }
      setError(errorMessage);
      alert(`Error deleting Pengajuan: ${errorMessage}`);
    }
  };

  // Function to handle "View" button click
  const handleView = (pengajuan: Pengajuan) => {
    setSelectedPengajuan(pengajuan);
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPengajuan(null);
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
                <td className="py-2 px-4 border-b">{pengajuan.nominal}</td>
                <td className="py-2 px-4 border-b">{pengajuan.nohp}</td>
                <td className="py-2 px-4 border-b">{pengajuan.pekerjaan}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleView(pengajuan)} // Handle "View" button click
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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

      {/* Modal to display Pengajuan details */}
      {isModalOpen && selectedPengajuan && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          {" "}
          {/* Added z-50 */}
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Pengajuan Details
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  ID: {selectedPengajuan.id}
                  <br />
                  Nama: {selectedPengajuan.nama}
                  <br />
                  Tujuan: {selectedPengajuan.Tujuan}
                  <br />
                  Nominal: {selectedPengajuan.nominal}
                  <br />
                  Tempat Lahir: {selectedPengajuan.Tlahir}
                  <br />
                  Tanggal Lahir: {selectedPengajuan.tglLahir}
                  <br />
                  Alamat: {selectedPengajuan.alamat}
                  <br />
                  No. KTP: {selectedPengajuan.noktp}
                  <br />
                  No. HP: {selectedPengajuan.nohp}
                  <br />
                  Pekerjaan: {selectedPengajuan.pekerjaan}
                  <br />
                  Penghasilan: {selectedPengajuan.penghasilan}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
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
