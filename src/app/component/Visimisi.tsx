import React from "react";

function Visimisi() {
  return (
    <div className="grid md:grid-cols-2 gap-4 grid-cols-1 text-xl min-h-screen bg-gray-100">
      <div className="bg-primary-light text-gray-100 text-right p-4 min-h-[300px] md:my-64 my-5">
        <div className="font-hind font-bold text-4xl">Visi Kami</div>
        <div>Terwujudnya Bank Syariah yang Unggul dan Terpercaya</div>
      </div>
      <div className="bg-primary-light text-gray-100 text-left p-4 min-h-[300px] md:my-64 my-5">
        <div className="font-hind font-bold text-4xl">Mis Kami</div>
        <div className="mx-4">
          <ul className="list-disc">
            <li>Menjalankan usaha perbankan yang sehat dan amanah</li>
            <li>Meberikan Pelayanan yang terbaik dan islami</li>
            <li>
              Berperan aktif dalam pengembangan dunia usaha dan peningkatan
              kesejateraan masyarakat
            </li>
            <li>
              Meningkatkan kemakmuran pemegang saham, pengurus dan karyawan
            </li>
            <li>Menjalankan misi dakwah yang rahmatan lil alamin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Visimisi;
