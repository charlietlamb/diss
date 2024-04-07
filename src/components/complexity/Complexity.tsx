"use client";

import { Button } from "@/components/ui/button";
import { Apple, Coffee, Soup } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ComplexityLevel = "simple" | "average" | "complex";
const iconMap: Record<ComplexityLevel, JSX.Element> = {
  simple: <Apple />,
  average: <Coffee />,
  complex: <Soup />,
};

export default function Complexity() {
  const complexities: ComplexityLevel[] = ["simple", "average", "complex"];
  const { method, render, complexity } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/app" || pathname.includes("results")) return null;
  return (
    <div className="relative z-50 flex min-h-full flex-col justify-start gap-y-8 border-r border-zinc-700">
      <h2 className="text-md border-b border-zinc-700 bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text p-4 text-left text-lg font-bold text-transparent">
        COMPLEXITY
      </h2>
      <div className="flex flex-grow flex-col justify-around px-4">
        {complexities.map((c: ComplexityLevel) => (
          <TooltipProvider key={c}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    if (c !== complexity) {
                      router.push(`/app/${method}/${render}/${c}`);
                      if (render === "server") router.refresh();
                    }
                  }}
                  variant="zinc_outline"
                  className={complexity === c ? "border-zinc-200" : ""}
                >
                  {iconMap[c]}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
