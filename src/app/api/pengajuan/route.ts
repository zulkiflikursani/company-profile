// app/api/pengajuan/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pengajuan = await prisma.pengajuan.findMany();
    return NextResponse.json(pengajuan);
  } catch (error) {
    console.error("Error fetching Pengajuan:", error);
    return NextResponse.json(
      { message: "Error fetching Pengajuan", error: error as string },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
