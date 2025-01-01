import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
async function updatePublish(
  prisma: PrismaClient,
  id: number,
  title: string,
  tgl_publish: string,
  authorId: number
) {
  try {
    const newsPost = await prisma.publishPost.update({
      where: {
        id: id,
      },
      data: {
        title,
        // url: filename,
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

export async function PUT(request: NextRequest) {
  const prisma = new PrismaClient({ log: ["query"] });
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const authorId = Number(formData.get("authorId"));
    const tgl_publish = formData.get("tgl_publish") as string;
    const id = parseInt(formData.get("id") as string, 10);

    if (!title || isNaN(authorId) || !tgl_publish) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields or invalid authorId",
        },
        { status: 400 }
      );
    }

    const newsPost = await updatePublish(
      prisma,
      id,
      title,
      tgl_publish,
      authorId
    );
    return NextResponse.json({ success: true, data: newsPost });
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
