// components/PdfViewer.tsx
import React from "react";

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        style={{ border: "none" }} // Hapus border jika perlu
        title="PDF Viewer"
      />
    </div>
  );
};

export default PdfViewer;
