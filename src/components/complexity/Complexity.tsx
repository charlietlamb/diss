"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setComplexity } from "@/state/render/renderSlice";
import { RootState } from "@/state/store";
import { Apple, Coffee, Soup } from "lucide-react";
import { usePathname } from "next/navigation";
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
  const { complexity } = useAppSelector((state: RootState) => state.render);
  const complexities: ComplexityLevel[] = ["simple", "average", "complex"];
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  if (pathname === "/app") return null;
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
                  onClick={() => dispatch(setComplexity(c))}
                  variant="zinc_outline"
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
