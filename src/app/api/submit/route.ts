// app/api/submit/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

interface PengajuanData {
  nominal: string;
  Tujuan: string;
  nama: string;
  Tlahir: string;
  tglLahir: string;
  alamat: string;
  noktp: string;
  nohp: string;
  pekerjaan: string;
  penghasilan: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: PengajuanData = await req.json();

    // Validation Errors Object
    const validationErrors: { [key: string]: string } = {};

    // Validate Nominal
    const parsedNominal = parseInt(data.nominal, 10);
    if (isNaN(parsedNominal) || parsedNominal <= 0) {
      validationErrors.nominal = "Nominal must be a positive number";
    }

    // Validate Tujuan
    if (!data.Tujuan || data.Tujuan.trim() === "") {
      validationErrors.Tujuan = "Tujuan is required";
    } else if (data.Tujuan.length > 255) {
      validationErrors.Tujuan = "Tujuan must be less than 256 characters";
    }

    // Validate Nama
    if (!data.nama || data.nama.trim() === "") {
      validationErrors.nama = "Nama is required";
    } else if (data.nama.length > 255) {
      validationErrors.nama = "Nama must be less than 256 characters";
    }

    // Validate Tlahir (Tempat Lahir)
    if (!data.Tlahir || data.Tlahir.trim() === "") {
      validationErrors.Tlahir = "Tempat Lahir is required";
    } else if (data.Tlahir.length > 255) {
      validationErrors.Tlahir = "Tempat lahir must be less than 256 characters";
    }

    // Validate tglLahir
    const parsedTglLahir = new Date(data.tglLahir);
    if (isNaN(parsedTglLahir.getTime())) {
      validationErrors.tglLahir = "Invalid date format for tglLahir";
    }

    // Validate Alamat
    if (!data.alamat || data.alamat.trim() === "") {
      validationErrors.alamat = "Alamat is required";
    } else if (data.alamat.length > 500) {
      validationErrors.alamat = "Alamat must be less than 501 characters";
    }

    // Validate noktp
    if (!data.noktp || data.noktp.trim() === "") {
      validationErrors.noktp = "No. KTP is required";
    } else if (!/^\d{16}$/.test(data.noktp)) {
      validationErrors.noktp = "No. KTP must be a 16-digit number";
    }

    // Validate nohp
    if (!data.nohp || data.nohp.trim() === "") {
      validationErrors.nohp = "No. HP is required";
    }
    const parsedNohp = parseInt(data.nohp, 10);
    if (isNaN(parsedNohp)) {
      validationErrors.nohp = "No. HP must be a number";
    } else if (!/^\d{10,15}$/.test(data.nohp)) {
      validationErrors.nohp = "No. HP must be between 10 and 15 digits";
    }

    // Validate Pekerjaan
    if (!data.pekerjaan || data.pekerjaan.trim() === "") {
      validationErrors.pekerjaan = "Pekerjaan is required";
    } else if (data.pekerjaan.length > 255) {
      validationErrors.pekerjaan = "Pekerjaan must be less than 256 characters";
    }

    // Validate Penghasilan
    const parsedPenghasilan = parseInt(data.penghasilan, 10);
    if (isNaN(parsedPenghasilan) || parsedPenghasilan < 0) {
      validationErrors.penghasilan =
        "Penghasilan must be a non-negative number";
    }

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { message: "Validation errors", errors: validationErrors },
        { status: 400 }
      );
    }

    const pengajuan = await prisma.pengajuan.create({
      data: {
        nominal: parsedNominal,
        Tujuan: data.Tujuan,
        nama: data.nama,
        Tlahir: data.Tlahir, // No need to cast to string, Prisma accepts string
        tglLahir: parsedTglLahir,
        alamat: data.alamat,
        noktp: data.noktp,
        nohp: parsedNohp.toString(),
        pekerjaan: data.pekerjaan,
        penghasilan: parsedPenghasilan,
      },
    });

    return NextResponse.json(
      { message: "Pengajuan created successfully", pengajuan },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Explicitly type 'error' as 'any' or 'Error'
    console.error(
      "Error creating Pengajuan:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        message: "Error creating Pengajuan",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
