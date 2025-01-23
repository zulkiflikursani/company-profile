import { Suspense } from "react";
import InformasiContent from "./InformasiContent";

export default function Informasi() {
  return (
    <Suspense
      fallback={
        <div className="hindi min-h-screen flex justify-center items-center">
          <p className="-mt-32">Loading...</p>
        </div>
      }
    >
      <InformasiContent />
    </Suspense>
  );
}
