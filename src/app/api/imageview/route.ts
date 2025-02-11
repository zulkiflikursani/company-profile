import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import mime from "mime-types";

export async function GET(req: NextRequest) {
  // Tambahkan CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
    "Access-Control-Expose-Headers": "Content-Length,Content-Range",
  };

  const searchParams = req.nextUrl.searchParams;
  const imageName = searchParams.get("imageName");

  if (!imageName) {
    return new NextResponse("Missing imageName parameter", {
      status: 400,
      headers,
    });
  }

  const imagePath = path.join(process.cwd(), "public", "uploads", imageName);

  try {
    const imageBuffer = await fs.readFile(imagePath);
    const contentType = mime.lookup(imageName) || "application/octet-stream";
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: { ...headers, "Content-Type": contentType },
    });
  } catch (error) {
    console.error("Error reading image:", error);
    return new NextResponse("Image not found", {
      status: 404,
      headers,
    });
  }
}

// Handle metode selain GET
// export async function OPTIONS(req: NextRequest) {
//     const headers = {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//       'Access-Control-Allow-Headers':
//         'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range',
//       'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
//     };
//     return new NextResponse(null, {
//       status: 204,
//       headers,
//     });
// }

// export async function PUT(req: NextRequest) {
//   return new NextResponse('Method not allowed', { status: 405 });
// }

// export async function DELETE(req: NextRequest) {
//   return new NextResponse('Method not allowed', { status: 405 });
// }
