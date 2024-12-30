// route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({ log: ["query"] });

interface NewsPostBody {
  id: number;
  title?: string;
  content?: string;
  authorId?: number | string;
  tgl_berita?: string;
}

interface ErrorResponse {
  success: false;
  message: string;
}

interface SuccessResponse<T> {
  success: true;
  data: T;
}

type ApiResponse<T> =
  | NextResponse<SuccessResponse<T>>
  | NextResponse<ErrorResponse>;

export async function PUT(request: NextRequest): Promise<ApiResponse<unknown>> {
  try {
    const body = (await request.json()) as NewsPostBody;
    const { id, title, content, authorId: authorid, tgl_berita } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing ID parameter" },
        { status: 400 }
      );
    }
    console.log(body);
    // const id = parseInt(idString, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID parameter" },
        { status: 400 }
      );
    }
    if (typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }
    if (typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Content is required" },
        { status: 400 }
      );
    }
    if (typeof tgl_berita !== "string" || tgl_berita.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Date is required" },
        { status: 400 }
      );
    }
    const authorId =
      typeof authorid === "number" ? authorid : parseInt(String(authorid), 10);

    if (isNaN(authorId)) {
      return NextResponse.json(
        { success: false, message: "Invalid Author ID" },
        { status: 400 }
      );
    }

    const tglBeritaDate = new Date(tgl_berita);

    if (isNaN(tglBeritaDate.getTime())) {
      return NextResponse.json(
        { success: false, message: "Invalid Date Format" },
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
  } catch (error) {
    console.error("Update News Post Error:", error);

    return NextResponse.json(
      { success: false, message: (error as string) || "Internal Server Error" },
      { status: 500 }
    );
  }
}
