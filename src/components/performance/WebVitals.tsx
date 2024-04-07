"use client";

import { setRequests } from "@/state/cache/cacheSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function WebVitals() {
  const supabase = createClientComponentClient<Database>();
  const { requests } = useAppSelector((state) => state.cache);
  const pathname = usePathname();
  const method = pathname.split("/")[2];
  const render = pathname.split("/")[3];
  const complexity = pathname.split("/")[4];
  const dispatch = useAppDispatch();
  const [loadTime, setLoadTime] = useState(0);
  const [init, setInit] = useState(false);
  const [TTFB, setTTFB] = useState(0);
  const [FCP, setFCP] = useState(0);
  const [LCP, setLCP] = useState(0);
  const [reportSent, setReportSent] = useState(false);
  useReportWebVitals((metric) => {
    console.log(metric);
    if (metric.name === "TTFB") setTTFB(metric.value);
    if (metric.name === "FCP") setFCP(metric.value);
    if (metric.name === "LCP") setLCP(metric.value);
  });

  useEffect(() => {
    async function getTime() {
      if (!init) return setInit(true);
      if (reportSent) return;
      if (TTFB === 0 || FCP === 0 || LCP === 0) return;
      const endTime = performance.now();
      const timeTaken = endTime - loadTime;
      const loadData = {
        method,
        render,
        complexity,
        time: timeTaken,
        ttfb: TTFB,
        fcp: FCP,
        lcp: LCP,
        cached: requests.includes(`${method}/${render}/${complexity}`),
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
        dispatch(
          setRequests([...requests, `${method}/${render}/${complexity}`]),
        );
      }
      setReportSent(true);
    }
    getTime();
  }, [loadTime, TTFB, FCP, LCP]);

  useEffect(() => {
    const startTime = performance.now();
    setLoadTime(startTime);
  }, []);
  return null;
}
