"use client";

import { setRequests } from "@/state/cache/cacheSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ServerWrap({
  children,
}: {
  children: React.ReactNode;
}) {
  let currentReq = "";
  const supabase = createClientComponentClient<Database>();
  const dispatch = useAppDispatch();
  const { requests } = useAppSelector((state) => state.cache);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await fetch("/api/toast");
      const data = await response.json();
      console.log(currentReq);
      console.log(data.key);
      console.log(data.key !== currentReq);
      if (data.key !== currentReq) {
        currentReq = data.key;
        const method = data.key.split("/")[0];
        const render = data.key.split("/")[1];
        const complexity = data.key.split("/")[2];
        const loadData =
          method === "submit"
            ? {
                method,
                render,
                complexity,
                time: data.time,
                cached: requests.includes(data.key),
              }
            : {
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
        const { error } = await supabase
          .from(method === "submit" ? "submissions" : "loads")
          .insert(loadData);
        if (error) throw error;
        if (!loadData.cached) {
          dispatch(setRequests([...requests, data.key]));
        }
      }
    }, 1000); // Fetch data every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <>{children}</>;
}
