import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const DEFAULT_IMAGE_URL = "/images/default-thumbnail.jpg"; // Ganti dengan URL gambar default Anda

export async function GET(req: Request) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 3;

  try {
    const allPosts = await prisma.publishPost.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.publishPost.count();
    const totalPage = Math.ceil(total / perPage);

    return NextResponse.json({
      success: true,
      data: allPosts,
      thumbnailUrl: DEFAULT_IMAGE_URL,
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
