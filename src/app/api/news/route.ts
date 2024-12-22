/*************  ✨ Codeium Command 🌟  *************/
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient({ log: ["query"] });
  try {
    const body = await request.json();
    const { title, content, authorid } = body;
    if (!title || !content || !authorid) {
      return NextResponse.json(
        { success: false, message: "Missing required fields " + authorid },
        { status: 400 }
      );
    }
    const newsPost = await prisma.newsPost.create({
      data: {
        title: title,
        content: content,
        authorId: authorid,
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
