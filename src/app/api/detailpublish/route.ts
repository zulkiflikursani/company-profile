import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const id = req.url ? new URL(req.url).searchParams.get("id") : null;
    const parsedId = id ? parseInt(id, 10) : 1;

    const post = await prisma.publishPost.findUnique({
      where: {
        id: parsedId,
      },
    });
    if (!post) {
      //If no post found with that id, return 404
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post, //Return single data
    });
  } catch (error: Error | unknown) {
    //Use 'any' instead of unknown
    console.error("Error fetching post:", error); // Log error message
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "An error occurred.",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
