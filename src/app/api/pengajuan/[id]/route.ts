// app/api/pengajuan/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

interface Params {
  id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { message: "Invalid Pengajuan ID" },
        { status: 400 }
      );
    }

    await prisma.pengajuan.delete({
      where: {
        id: parsedId,
      },
    });

    return NextResponse.json({ message: "Pengajuan deleted successfully" });
  } catch (error) {
    console.error("Error deleting Pengajuan:", error);
    return NextResponse.json(
      { message: "Error deleting Pengajuan", error: error as string },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
