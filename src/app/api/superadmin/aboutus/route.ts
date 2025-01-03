import { NextResponse, NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    console.log("Endpoint hit");
    const updatedData = await req.json();
    console.log("Data Received:", updatedData);
    const filePath = path.join(
      process.cwd(),
      "src/app/config/file-content.json"
    );
    console.log("File Path:", filePath);
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf8");
    console.log("File updated success");
    return NextResponse.json(
      { message: "File content updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error writing file:", error);
    return NextResponse.json(
      { message: "Error writing to file" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/app/config/file-content.json"
    );
    const fileContent = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);
    return NextResponse.json(jsonData, { status: 200 });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { message: "Error reading file" },
      { status: 500 }
    );
  }
}
