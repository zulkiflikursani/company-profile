/*************  ✨ Codeium Command 🌟  *************/
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient({ log: ["query"] });
  const session = await getServerSession(authOptions);
  try {
    const body = await request.json();
    const { title, content, authorid, tgl_berita } = body;
    if (!title || !content || !authorid || !tgl_berita) {
      return NextResponse.json(
        { success: false, message: "Missing required fields " + authorid },
        { status: 400 }
      );
    }
    const newsPost = await prisma.newsPost.create({
      data: {
        title: title,
        content: content,
        tgl_berita: new Date(tgl_berita),
        authorId: session?.user?.id,
      },
    });

    return NextResponse.json({ success: true, data: newsPost });
  } catch (error: Error | unknown) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
