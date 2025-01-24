import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import path from "path";

const DEFAULT_IMAGE_URL = "/uploads/default-thumbnail.png"; // Ganti dengan URL gambar default Anda

const extractFirstImageUrl = (content: string): string | null => {
  const imgRegex = /<img.*?src=["'](.*?)["'].*?>/i;
  const match = content.match(imgRegex);

  if (match) {
    const imageUrl = match[1];
    // Use path.basename to extract the filename
    let filename = path.basename(imageUrl);
    if (filename.startsWith("?imageName=")) {
      filename = filename.substring("?imageName=".length);
    }

    return filename;
  }

  return null;
};

export async function GET(req: Request) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 3;

  try {
    const allPosts = await prisma.newsPost.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: "desc",
      },
    });

    const postsWithThumbnails = await Promise.all(
      allPosts.map(async (post) => {
        let thumbnailUrl = extractFirstImageUrl(post.content);
        if (!thumbnailUrl) {
          thumbnailUrl = DEFAULT_IMAGE_URL;
        }
        return {
          ...post,
          thumbnailUrl,
        };
      })
    );
    const total = await prisma.newsPost.count();
    const totalPage = Math.ceil(total / perPage);

    return NextResponse.json({
      success: true,
      data: postsWithThumbnails,
      totalPage,
      page,
    });
  } catch (error: Error | unknown) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
