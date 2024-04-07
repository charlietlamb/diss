"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import ResultsComplexity from "./ResultsComplexity";
import { usePathname } from "next/navigation";
import ResultsMethod from "./ResultsMethod";
export default function Results({ loadData }: { loadData: Load[] }) {
  console.log(loadData);
  const data = loadData.map((load, index) => ({ goal: load.time, index }));
  const pathname = usePathname();
  const method = pathname.split("/")[2];
  const render = pathname.split("/")[3];
  const complexity = pathname.split("/")[4];
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-y-8 bg-black">
      <div className="flex h-full min-h-full min-w-full">
        <ResultsComplexity />
        <div className="flex flex-col gap-8 pt-16">
          <ResultsMethod />
          <div className="flex flex-col items-center">
            <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
              {`${render.slice(0, 1).toUpperCase() + render.slice(1)} Side ${method.slice(0, 1).toUpperCase() + method.slice(1)}: ${complexity.slice(0, 1).toUpperCase() + complexity.slice(1)}`}
            </h1>
            <h2 className="font-xl text-zinc-400">
              24 randomly generated values
            </h2>
          </div>
          <div className="h-[60vh] w-[80vw]">
            <ResponsiveContainer width="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="goal"
                  style={
                    {
                      fill: "#E4E4E7",
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                />
                <XAxis dataKey="index" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
