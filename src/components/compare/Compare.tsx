"use client";

import { useEffect, useState } from "react";
import { CompareContext } from "./context/compareContext";
import CompareSelects from "./CompareSelects";
import CompareCharts from "./CompareCharts";
import CompareResults from "./CompareResults";
import { ActionTooltip } from "../ui/ActionToolTip";
import { Toggle } from "../ui/toggle";
import { DatabaseZap } from "lucide-react";
import { getLoads } from "./functions/getLoads";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Compare() {
  const supabase = createClientComponentClient<Database>();
  const [init, setInit] = useState(false);
  const [data1, setData1] = useState<Load[]>([]);
  const [data1Cached, setData1Cached] = useState<boolean>(false);
  const [data2, setData2] = useState<Load[]>([]);
  const [data2Cached, setData2Cached] = useState<boolean>(false);
  const [cache, setCache] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      setData1(await getLoads(supabase, "form", "client", "simple"));
      setData2(await getLoads(supabase, "form", "server", "simple"));
      setInit(true);
    }
    getData();
  }, []);
  if (!init) return null;
  return (
    <CompareContext.Provider
      value={{
        data1,
        setData1,
        data2,
        setData2,
        data1Cached,
        setData1Cached,
        data2Cached,
        setData2Cached,
        cache,
        setCache,
      }}
    >
      <div className="relative z-10 flex h-full w-full flex-grow flex-col gap-4 bg-zinc-950 p-8">
        <div className="flex items-center justify-center gap-4">
          <h1 className="relative z-50 bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-7xl font-bold text-transparent">
            Compare Results
          </h1>
          <ActionTooltip
            label={!cache ? "Compare Cached?" : "Don't Compare Cached?"}
          >
            <Toggle
              onClick={() => setCache(!cache)}
              className={cache ? "h-full bg-zinc-800 p-4" : "h-full p-4"}
            >
              <DatabaseZap className="h-12 w-12" />
            </Toggle>
          </ActionTooltip>
        </div>
        <CompareSelects />
        <CompareCharts />
        <CompareResults />
      </div>
    </CompareContext.Provider>
  );
}
