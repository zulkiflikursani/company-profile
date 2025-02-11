"use client";
import React, { useState } from "react";
import InputText from "../component/InputText";

function Page() {
  const [nominal, setNominal] = useState("");
  return (
    <>
      <div className="w-full ">
        <div id="form" className="p-10 w-full flex flex-col">
          <InputText
            label={"Nominal Pembiayaan"}
            value={nominal}
            onChange={(e) => setNominal(e)}
          />
          <InputText
            label="Tujuan Pembiayan"
            value={nominal}
            onChange={(e) => setNominal(e)}
          />
          <InputText
            label="Nama"
            value={nominal}
            onChange={(e) => setNominal(e)}
          />
          <InputText
            label="TTL"
            value={nominal}
            onChange={(e) => setNominal(e)}
          />
          <InputText
            label="Alamat"
            value={nominal}
            onChange={(e) => setNominal(e)}
          />
          <InputText
            label="No. KTP"
            value={nominal}
            onChange={(e) => setNominal(e)}
          />
          <InputText
            label="Ho. Hp / WhatsApp"
            value={nominal}
            onChange={(e) => setNominal(e)}
          />
          <InputText
            label=" Pekerjaan "
            value={nominal}
            onChange={(e) => setNominal(e)}
          />
          <InputText
            label="Penghasilan Bersih"
            value={nominal}
            onChange={(e) => setNominal(e)}
          />
        </div>
      </div>
    </>
  );
}

export default Page;
