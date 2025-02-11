"use client";
import React, { useState, useEffect } from "react";
import PdfViewer from "@/app/component/PdfViewer";
// import { useRouter,useParauseSearchParams } from "next/router";
import { useSearchParams } from "next/navigation";

const PdfViewerPage = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const pdfName = searchParams.get("pdfName");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pdfName) {
      setPdfUrl(`/api/pdfview/?pdfName=${pdfName as string}`);
      setError(null);
    }
  }, [pdfName]);

  return (
    <div>
      {pdfUrl ? (
        <PdfViewer pdfUrl={pdfUrl} />
      ) : (
        <div>
          {error ? <p>Error : {error}</p> : <p>Loading PDF Viewer...</p>}
        </div>
      )}
    </div>
  );
};

export default PdfViewerPage;
