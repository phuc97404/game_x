import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(
  process.cwd(),
  "app",
  "admin",
  "initialAccounts.json"
);

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (e) {
    return NextResponse.json(
      { error: "Không đọc được dữ liệu" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Không ghi được dữ liệu" },
      { status: 500 }
    );
  }
}
