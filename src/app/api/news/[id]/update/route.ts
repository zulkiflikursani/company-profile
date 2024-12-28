// route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({ log: ["query"] });

interface NewsPostBody {
  title?: string;
  content?: string;
  authorId?: number;
  tgl_berita?: string;
}
interface ErrorResponse {
  message: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ success: boolean; data?: unknown } | ErrorResponse>> {
  try {
    const body = (await request.json()) as NewsPostBody;
    const { title, content, authorId: authorid, tgl_berita } = body;
    const idString = await params.id;

    console.log("body", body);

    if (!idString) {
      return NextResponse.json(
        { success: false, message: "Missing ID parameter" },
        { status: 400 }
      );
    }

    const id = parseInt(idString, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID parameter" },
        { status: 400 }
      );
    }

    if (!title || !content || !authorid || !tgl_berita) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields" + authorid + tgl_berita,
        },
        { status: 400 }
      );
    }

    const authorId = authorid;

    if (isNaN(authorId)) {
      return NextResponse.json(
        { success: false, message: "Invalid Author ID" },
        { status: 400 }
      );
    }

    const tglBeritaDate = new Date(tgl_berita);

    if (isNaN(tglBeritaDate.getTime())) {
      return NextResponse.json(
        { success: false, message: "Invalid Tgl Berita" },
        { status: 400 }
      );
    }
    const newsPost = await prisma.newsPost.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        tgl_berita: tglBeritaDate,
        authorId: authorId,
      },
    });
    return NextResponse.json({ success: true, data: newsPost });
  } catch (error: unknown) {
    console.error("Update News Post Error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
