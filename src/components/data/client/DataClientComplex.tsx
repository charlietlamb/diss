"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setRequests } from "@/state/cache/cacheSlice";
import { toast } from "sonner";

export default function DataClientComplex() {
  const svgRef = useRef<SVGSVGElement>(null);
  const supabase = createClientComponentClient<Database>();
  const { requests } = useAppSelector((state) => state.cache);
  const dispatch = useAppDispatch();
  const [init, setInit] = useState(false);

  useEffect(() => {
    async function getData() {
      const startTime = performance.now();
      const width = 960;
      const height = 500;
      const n = 10;
      const m = 50;
      const k = 5;
      const offset = d3.stackOffsetWiggle;
      const x = d3
        .scaleLinear()
        .domain([0, m - 1])
        .range([0, width]);
      const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
      const z = d3.interpolateCool;

      const area = d3
        .area()
        .x((d, i) => x(i)!)
        .y0((d) => y(d[0])!)
        .y1((d) => y(d[1])!);

      const stack = d3
        .stack()
        .keys(d3.range(n) as any)
        .offset(offset)
        .order(d3.stackOrderNone);

      function randomize() {
        const layers = stack(
          d3.transpose(Array.from({ length: n }, () => bumps(m, k))) as any,
        );
        y.domain([
          d3.min(layers, (l) => d3.min(l, (d) => d[0]))!,
          d3.max(layers, (l) => d3.max(l, (d) => d[1]))!,
        ]);
        return layers;
      }

      const svg = d3
        .select(svgRef.current)
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto;");

      const path = svg
        .selectAll("path")
        .data(randomize())
        .join("path")
        .attr("d", area as any)
        .attr("fill", () => z(Math.random()));

      const updateChart = async () => {
        const layers = randomize();
        await path
          .data(layers)
          .transition()
          .delay(1000)
          .duration(1500)
          .attr("d", area as any)
          .end();
        setTimeout(updateChart, 2500);
      };

      await updateChart();
      if (!init) return setInit(true);
      const endTime = performance.now();
      const timeTaken = endTime - startTime;
      const loadData = {
        method: "data",
        render: "client",
        complexity: "simple",
        time: timeTaken,
        cached: requests.includes("data/client/simple"),
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
        dispatch(setRequests([...requests, "data/client/simple"]));
      }
    }
    getData();
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="flex h-full min-h-full w-full flex-col gap-4 p-4">
      <div className="flex flex-col items-center">
        <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
          Client Side Data: Complex
        </h1>
        <h2 className="font-xl text-zinc-400">
          20 Layers, 200 Samples, 10 Bumps
        </h2>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}

// Helper function to generate random bumps
function bumps(n: number, m: number): number[] {
  const a = [];
  for (let i = 0; i < n; ++i) {
    a[i] = 0;
  }
  for (let j = 0; j < m; ++j) {
    let x = 1 / (0.1 + Math.random());
    let y = 2 * Math.random() - 0.5;
    let z = 10 / (0.1 + Math.random());
    for (let i = 0; i < n; i++) {
      let w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  return a;
}
