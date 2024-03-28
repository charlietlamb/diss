type DataItem = {
  goal: number;
  index?: number;
};

import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
  const data1000: DataItem[] = Array.from({ length: 1000 }, () => ({
    goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
  }));

  const dataWithIndex: DataItem[] = data1000.map((item, index) => ({
    ...item,
    index,
  }));
  return NextResponse.json(dataWithIndex);
}
