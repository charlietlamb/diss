"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function ChartsClientAverage() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/data");
      if (response.ok) {
        console.log("setting data");
        setData(await response.json());
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 pt-16">
      <div className="flex flex-col items-center">
        <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
          Client Side Charts: Average
        </h1>
        <h2 className="font-xl text-zinc-400">50 values from an API</h2>
      </div>
      <div className="h-[50vh] w-[80vw]">
        <ResponsiveContainer width="100%" height={400}>
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
            <XAxis dataKey="index" className="text-xs" />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
