"use client";

import { setRequests } from "@/state/cache/cacheSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { RootState } from "@/state/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

export default function ChartsClientAverage() {
  const [data, setData] = useState([]);
  const [init, setInit] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const { requests } = useAppSelector((state: RootState) => state.cache);
  const dispatch = useAppDispatch();

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
  const [loadTime, setLoadTime] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    setLoadTime(startTime);
  }, []);

  useEffect(() => {
    async function getTime() {
      if (!init) return setInit(true);
      await fetchData();
      const endTime = performance.now();
      const timeTaken = endTime - loadTime;
      const loadData = {
        method: "charts",
        render: "client",
        complexity: "average",
        time: timeTaken,
        cached: requests.includes("charts/client/average"),
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
        dispatch(setRequests([...requests, "charts/client/average"]));
      }
    }
    getTime();
  }, [loadTime]);

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
