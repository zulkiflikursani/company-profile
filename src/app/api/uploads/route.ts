import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse the multipart/form-data request using Multer
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Save file to the uploads directory
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, file.name);
    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    // Construct file URL
    const fileUrl = `/uploads/${file.name}`;

    // Save file metadata to Prisma
    const fileRecord = await prisma.file.create({
      data: {
        originalName: file.name,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        url: fileUrl,
      },
    });

    return NextResponse.json({ url: fileRecord.url });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 }
    );
  }
}
