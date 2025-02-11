// pages/api/pdfview.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import mime from "mime-types";

export async function GET(req: NextRequest) {
  // Tambahkan CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
    "Access-Control-Expose-Headers": "Content-Length,Content-Range",
    "Cache-Control": "no-store",
  };
  const searchParams = req.nextUrl.searchParams;
  const pdfName = searchParams.get("pdfName");

  if (!pdfName) {
    return new NextResponse("Missing pdfName parameter", {
      status: 400,
      headers,
    });
  }
  const pdfPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "publish",
    pdfName
  );

  try {
    const pdfBuffer = await fs.readFile(pdfPath);
    const contentType = mime.lookup(pdfName) || "application/octet-stream";
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: { ...headers, "Content-Type": contentType },
    });
  } catch (error) {
    console.error("Error reading pdf:", error);
    return new NextResponse("Pdf not found", {
      status: 404,
      headers,
    });
  }
}
// Handle metode selain GET
