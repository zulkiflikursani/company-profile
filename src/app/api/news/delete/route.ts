import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const prisma = new PrismaClient();

  const { id } = await req.json();
  try {
    const del = await prisma.newsPost.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    return NextResponse.json(del);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error deleting post" });
  }
}
