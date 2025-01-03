import { NextResponse, NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";

// Disable the bodyParser, so that we can process the file
export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: File, id: string) => {
  const fileExtension = path.extname(file.name || "");
  const fileName = `${id}${fileExtension}`;
  const uploadsDir = "public/image/pengurus";
  const filePath = path.join(uploadsDir, fileName);

  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    const fileBuffer = await file.arrayBuffer();
    const fileData = Buffer.from(fileBuffer);
    await fs.writeFile(filePath, fileData);
    return {
      filePath: `/image/pengurus/${fileName}`,
      fileName,
      success: true,
    };
  } catch (err) {
    console.error("Error saving file:", err);
    return { filePath: "", fileName, success: false };
  }
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const id = formData.get("id");
    if (typeof id !== "string") {
      return NextResponse.json({ message: "Invalid id type" }, { status: 400 });
    }

    const file = formData.get("image") as File;
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: "Invalid file" }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (file.size > maxSize) {
      return NextResponse.json({ message: "File too large" }, { status: 400 });
    }
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "File type not allowed" },
        { status: 400 }
      );
    }
    const { filePath, success } = await saveFile(file, id);

    if (success) {
      const baseUrl = `${
        req.headers.get("x-forwarded-proto") || "http"
      }://${req.headers.get("host")}`;
      const imageUrl = `${baseUrl}${filePath}`;
      return NextResponse.json({ imageUrl }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Failed to upload file" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json(
      { message: `Error during file upload: ${error}` },
      { status: 500 }
    );
  }
}
