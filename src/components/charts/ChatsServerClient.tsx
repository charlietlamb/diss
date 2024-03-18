"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
export default function ChatsServerClient({
  data,
  start,
}: {
  data: { goal: number }[][];
  start: number;
}) {
  const timeTaken = performance.now() - start;
  toast.success(`Time taken to generate data: ${timeTaken.toFixed(2)}ms`),
    { icon: "🕰" };
  return (
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
  );
}
