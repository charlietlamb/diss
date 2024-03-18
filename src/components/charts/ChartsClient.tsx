"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const data10 = Array.from({ length: 10 }, () => ({
  goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
}));
const data100 = Array.from({ length: 100 }, () => ({
  goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
}));
const data1000 = Array.from({ length: 1000 }, () => ({
  goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
}));

const data = [data10, data100, data1000];

export default function ChartsClient() {
  const [loadTime, setLoadTime] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    setLoadTime(startTime);
  }, []);

  useEffect(() => {
    const endTime = performance.now();
    const timeTaken = endTime - loadTime;
    toast("Initial load time: " + Math.round(timeTaken) + "ms", { icon: "🕰" });
  }, [loadTime]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 pt-16">
      <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
        Client Charts
      </h1>
      <Carousel className="h-[60vh] w-[60vw]">
        <CarouselContent>
          {data.map((dataGoals: { goal: number }[], index) => (
            <CarouselItem key={index} className="flex flex-col gap-y-4">
              <h2 className="relative z-50 w-full text-center text-2xl font-semibold text-zinc-200">
                {dataGoals.length} Data Points
              </h2>
              <div className="h-[60vh]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataGoals}>
                    <Bar
                      dataKey="goal"
                      style={
                        {
                          fill: "hsl(var(--foreground))",
                          opacity: 0.9,
                        } as React.CSSProperties
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
