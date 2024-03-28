"use client";

import { setRequests } from "@/state/cache/cacheSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

const data24 = Array.from({ length: 24 }, () => ({
  goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
}));

const dataWithIndex = data24.map((item, index) => ({
  ...item,
  index,
}));
export default function ChartsClientSimple() {
  const [loadTime, setLoadTime] = useState(0);
  const [init, setInit] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const { requests } = useAppSelector((state: RootState) => state.cache);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const startTime = performance.now();
    setLoadTime(startTime);
  }, []);

  useEffect(() => {
    async function getData() {
      if (!init) return setInit(true);
      const endTime = performance.now();
      const timeTaken = endTime - loadTime;
      const loadData = {
        method: "charts",
        render: "client",
        complexity: "simple",
        time: timeTaken,
        cached: requests.includes("charts/client/simple"),
      };
      toast("Initial load time: " + Math.round(timeTaken) + "ms", {
        icon: "🕰",
        description: loadData.cached
          ? "This page was previously cached"
          : "This page was not cached",
      });
      const { error } = await supabase.from("loads").insert(loadData);
      if (error) throw error;
      if (!loadData.cached) {
        dispatch(setRequests([...requests, "charts/client/simple"]));
      }
    }
    getData();
  }, [loadTime]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 pt-16">
      <div className="flex flex-col items-center">
        <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
          Client Side Charts: Simple
        </h1>
        <h2 className="font-xl text-zinc-400">24 randomly generated values</h2>
      </div>
      <div className="h-[60vh] w-[80vw]">
        <ResponsiveContainer width="100%">
          <BarChart data={dataWithIndex}>
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
  );
}
