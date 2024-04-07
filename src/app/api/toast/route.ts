import { NextRequest, NextResponse } from "next/server";

let data: {
  time: number;
  key: string;
} | null = null;

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log("---BODY---");
  console.log(body);
  data = body;
  return NextResponse.json(data);
}

export function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json(data);
}
