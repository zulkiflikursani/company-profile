import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const imageName = searchParams.get("imageName");

  if (!imageName) {
    return new NextResponse("Missing imageName parameter", { status: 400 });
  }

  // Sesuaikan dengan lokasi penyimpanan gambar Anda.
  const imagePath = path.join(process.cwd(), "public", "uploads", imageName);

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: { "Content-Type": "image/*" }, // Sesuaikan Content-Type jika perlu
    });
  } catch (error) {
    console.error("Error reading image:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
