"use client";

import { setRequests } from "@/state/cache/cacheSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getCookie, setCookie } from "cookies-next";

export function WebVitals({ noReport }: { noReport?: boolean }) {
  const [cached, setCached] = useState(false);
  const pathname = usePathname();
  const [method, setMethod] = useState(noReport ? "" : pathname.split("/")[2]);
  const [render, setRender] = useState(noReport ? "" : pathname.split("/")[3]);
  const [complexity, setComplexity] = useState(
    noReport ? "" : pathname.split("/")[4],
  );
  const path = `${method}/${render}/${complexity}`;
  useEffect(() => {
    let jsonMap: Record<string, number> = {};
    const cookieStr = getCookie("str");
    console.log(cookieStr);

    if (cookieStr) {
      try {
        jsonMap = JSON.parse(cookieStr);
      } catch (error) {
        console.error("Invalid JSON:", cookieStr);
      }
    }

    if (jsonMap.hasOwnProperty(path)) {
      if (jsonMap[path] > 1) setCached(true);
      jsonMap[path]++;
    } else {
      jsonMap[path] = 0;
    }

    setCookie("str", JSON.stringify(jsonMap));
  }, [path]);
  useReportWebVitals((metric) => {
    if (metric.name === "CLS") setCLS(metric.value);
    if (metric.name === "FCP") setFCP(metric.value);
    if (metric.name === "LCP") setLCP(metric.value);
  });
  const supabase = createClientComponentClient<Database>();
  const [init, setInit] = useState(false);
  const [CLS, setCLS] = useState(0);
  const [FCP, setFCP] = useState(0);
  const [LCP, setLCP] = useState(0);
  const [reportSent, setReportSent] = useState(false);
  useEffect(() => {
    setCLS(0);
    setFCP(0);
    setLCP(0);
    setReportSent(false);
  }, [method, render, complexity]);
  useEffect(() => {
    if (noReport) return;
    async function getTime() {
      if (!init) return setInit(true);
      if (reportSent) return;
      if (!(CLS && FCP && LCP)) return;
      const loadData = {
        method,
        render,
        complexity,
        time: 0,
        cls: CLS,
        fcp: FCP,
        lcp: LCP,
        cached,
      };
      toast("First Contentful Paint: " + Math.round(FCP) + "ms", {
        icon: "🕰",
        description: loadData.cached
          ? "This page was previously cached"
          : "This page was not cached",
      });
      const { error } = await supabase.from("loads").insert(loadData);
      if (error) throw error;
      setReportSent(true);
    }
    getTime();
  }, [CLS, FCP, LCP]);

  return null;
}
