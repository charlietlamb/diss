"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { strings } from "../compare/data/compareData";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Developer from "../developer/Developer";
export default function Results() {
  const supabase = createClientComponentClient();
  const [loadData, setLoadData] = useState<Load[]>([]);
  const initFcp = loadData.map((load, index) => ({ goal: load.fcp, index }));
  const [fcp, setFcp] = useState(initFcp);
  const initLcp = loadData.map((load, index) => ({ goal: load.lcp, index }));
  const [lcp, setLcp] = useState(initLcp);
  const initFid = loadData.map((load, index) => ({ goal: load.fid, index }));
  const [fid, setFid] = useState(initFid);
  const [init, setInit] = useState(false);
  const [method, setMethod] = useState("");
  const [render, setRender] = useState("");
  const [complexity, setComplexity] = useState("");
  const [path, setPath] = useState<string>(`form/client/simple`);

  useEffect(() => {
    async function getData() {
      const newMethod = init ? path.split("/")[0] : "form";
      const newRender = init ? path.split("/")[1] : "client";
      const newComplexity = init ? path.split("/")[2] : "simple";
      setInit(true);

      if (
        newMethod !== method ||
        newRender !== render ||
        newComplexity !== complexity
      ) {
        const { data, error } = await supabase
          .from("loads")
          .select()
          .eq("method", newMethod)
          .eq("render", newRender)
          .eq("complexity", newComplexity);
        if (error) throw error;
        setMethod(newMethod);
        setRender(newRender);
        setComplexity(newComplexity);
        setFcp(
          data.map((load, index) => ({
            goal: method !== "submit" ? load.fcp : load.time,
            index,
          })),
        );
        setLcp(data.map((load, index) => ({ goal: load.lcp, index })));
        setFid(data.map((load, index) => ({ goal: load.fid, index })));
      }
    }
    getData();
  }, [path]);
  if (!render || !method || !complexity) return null;
  return (
    <div className="relative z-10 flex h-full w-full flex-grow flex-col items-center justify-center gap-y-8 bg-black">
      <div className="flex flex-col gap-8 py-16">
        <h1 className=" bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
          Results
        </h1>
        <Select value={path} onValueChange={setPath}>
          <SelectTrigger>
            <SelectValue placeholder="Select a test..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {strings.map((string) => (
                <SelectItem key={string} value={string}>
                  {string}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-col items-center">
          <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
            {`${render.slice(0, 1).toUpperCase() + render.slice(1)} Side ${method.slice(0, 1).toUpperCase() + method.slice(1)}: ${complexity.slice(0, 1).toUpperCase() + complexity.slice(1)}`}
          </h1>
        </div>
        {method !== "submit" ? (
          <>
            {" "}
            <h3 className="text-4xl font-bold text-zinc-200">
              First Contentful Paint
            </h3>
            <div className="h-[60vh] w-[80vw]">
              <ResponsiveContainer width="100%">
                <BarChart data={fcp}>
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
            <h3 className="text-4xl font-bold text-zinc-200">
              Largest Contentful Paint
            </h3>
            <div className="h-[60vh] w-[80vw]">
              <ResponsiveContainer width="100%">
                <BarChart data={lcp}>
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
            <h3 className="text-4xl font-bold text-zinc-200">
              Cumulative Layout Shift
            </h3>
            <div className="h-[60vh] w-[80vw]">
              <ResponsiveContainer width="100%">
                <BarChart data={fid}>
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
          </>
        ) : (
          <>
            <h3 className="text-4xl font-bold text-zinc-200">Submit Time</h3>
            <div className="h-[60vh] w-[80vw]">
              <ResponsiveContainer width="100%">
                <BarChart data={fcp}>
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
          </>
        )}
        <h3 className="text-4xl font-bold text-zinc-200">Developer Feedback</h3>
        <Developer
          addText
          inline
          initKey={`${method !== "submit" ? method : "form"}/${render}/${complexity}`}
        />{" "}
      </div>
    </div>
  );
}
