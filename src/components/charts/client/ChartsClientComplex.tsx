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

const data50 = Array.from({ length: 50 }, () => ({
  goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
}));

export default function ChartsClientComplex() {
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
        Client Side Charts: Complex
      </h1>
      <div className="h-[60vh]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data50}>
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
    </div>
  );
}
