// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface RegistrationBody {
  username: string;
  password: string;
}

interface RegistrationError {
  message: string;
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<RegistrationError | { message: string }>> {
  try {
    const body = (await req.json()) as RegistrationBody;
    const { username, password } = body;

    if (!password || !username) {
      return NextResponse.json(
        { message: "Please enter all fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const reset = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (reset) {
      return NextResponse.json(
        { message: "Ganti Password successful" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Ganti Password failed" },
        { status: 400 }
      );
    }
  } catch (error: Error | unknown) {
    console.error("Registration Error:", error);
    if (error) {
      return NextResponse.json({ message: error as string }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
