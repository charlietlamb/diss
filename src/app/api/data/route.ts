type DataItem = {
  goal: number;
  index?: number;
};

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
  const data50: DataItem[] = Array.from({ length: 50 }, () => ({
    goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
  }));

  const dataWithIndex: DataItem[] = data50.map((item, index) => ({
    ...item,
    index,
  }));
  return NextResponse.json(dataWithIndex);
}
