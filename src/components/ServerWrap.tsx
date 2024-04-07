"use client";

import { setAllRequests, setRequests } from "@/state/cache/cacheSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useReportWebVitals } from "next/web-vitals";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ServerWrap({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient<Database>();
  const dispatch = useAppDispatch();
  const { requests, allRequests } = useAppSelector((state) => state.cache);
  const [TTFB, setTTFB] = useState(0);
  const [FCP, setFCP] = useState(0);
  const [LCP, setLCP] = useState(0);
  useReportWebVitals((metric) => {
    console.log(metric);
    if (metric.name === "TTFB") setTTFB(metric.value);
    if (metric.name === "FCP") setFCP(metric.value);
    if (metric.name === "LCP") setLCP(metric.value);
  });
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await fetch("/api/toast");
      const data = await response.json();
      console.log(data);
      if (
        data &&
        data.key &&
        data.key !== allRequests[allRequests.length - 1]
      ) {
        console.log("here?");
        if (!data) return;
        console.log(data.key);
        const method = data.key.split("/")[0];
        const render = data.key.split("/")[1];
        const complexity = data.key.split("/")[2];
        const loadData = {
          method,
          render,
          complexity,
          time: data.time,
          cached: requests.includes(data.key),
        };
        toast("Initial load time: " + Math.round(data.time) + "ms", {
          icon: "🕰",
          description: loadData.cached
            ? "This page was previously cached"
            : "This page was not cached",
        });
        const { error } = await supabase.from("loads").insert(loadData);
        if (error) throw error;
        dispatch(setAllRequests([...allRequests, data.key]));
        if (!loadData.cached) {
          dispatch(setRequests([...requests, data.key]));
        }
      }
    }, 1000); // Fetch data every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [allRequests]); // Include currentReq in the dependency array

  return <>{children}</>;
}
