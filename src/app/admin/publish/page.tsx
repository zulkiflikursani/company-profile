import React, { Suspense } from "react";
import InformasiContent from "./InformasiContent";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <InformasiContent />
      </div>
    </Suspense>
  );
};

export default page;
