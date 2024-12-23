import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

// Type definition for the file upload result
interface UploadResult {
  status: number;
  filename?: string;
  error?: string;
}
function generateUniqueFilename(originalFilename: string): string {
  const fileExtension = path.extname(originalFilename);
  const uniqueId = uuidv4();
  return `${uniqueId}${fileExtension}`;
}
// Function to handle file upload
async function uploadFile(file: File): Promise<UploadResult> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueFilename = generateUniqueFilename(file.name);
    const uploadDir = path.join(process.cwd(), "public", "uploads", "publish");

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, uniqueFilename);

    await fs.writeFile(filePath, buffer);
    return {
      status: 200,
      filename: `/uploads/publish/${uniqueFilename}`,
    };
  } catch (error) {
    return {
      status: 500,
      error: "error",
    };
    console.error("Error during file upload:", error);
    throw new Error("Failed to upload file"); // Rethrow for better error handling
  }
}

// Function to create a news post in the database
async function createNewsPost(
  prisma: PrismaClient,
  title: string,
  filename: string,
  tgl_publish: string,
  authorId: number
) {
  try {
    const newsPost = await prisma.publishPost.create({
      data: {
        title,
        url: filename,
        tgl_publish: new Date(tgl_publish),
        authorId,
      },
    });
    return newsPost;
  } catch (error) {
    console.error("Error creating news post:", error);
    throw new Error("Failed to create news post in database");
  }
}

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient({ log: ["query"] });
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const file = formData.get("file") as File | null;
    const authorId = Number(formData.get("authorId"));
    const tgl_publish = formData.get("tgl_publish") as string;

    if (!title || !file || isNaN(authorId) || !tgl_publish) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields or invalid authorId",
        },
        { status: 400 }
      );
    }

    const { status, filename } = await uploadFile(file);
    if (status !== 200) {
      return NextResponse.json(
        { success: false, message: "File upload failed." },
        { status: 500 }
      );
    }
    if (filename) {
      const newsPost = await createNewsPost(
        prisma,
        title,
        filename,
        tgl_publish,
        authorId
      );
      return NextResponse.json({ success: true, data: newsPost });
    }
  } catch (error: Error | unknown) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
