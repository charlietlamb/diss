import { NextRequest, NextResponse } from "next/server";

let data: {
  time: number;
  key: string;
} | null = null;

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);
  data = body;
  return NextResponse.json(data);
}

export function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json(data);
}

// Add this function to clear data when the server restarts
export function UNLOAD() {
  data = null;
}
