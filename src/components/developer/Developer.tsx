"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import { usePathname } from "next/navigation";
import { developerData } from "./developerData";
import { cn } from "@/lib/utils";

export default function Developer({
  addText = false,
  inline = false,
  initKey = null,
}: {
  addText?: boolean;
  inline?: boolean;
  initKey?: string | null;
}) {
  const pathname = usePathname();
  const key =
    initKey ||
    `${pathname.split("/")[2]}/${pathname.split("/")[3]}/${pathname.split("/")[4]}`;
  if (!key.includes("client") && !key.includes("server")) return null;
  const data: { text: string; score: number } | undefined =
    developerData.get(key);
  if (!data) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "absolute right-4 top-4 bg-zinc-950",
            inline && "relative w-full justify-center gap-2 text-xl",
          )}
          variant="zinc_outline"
          style={{ zIndex: 51 }}
        >
          {addText && "Developer Feedback"}
          <Command />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Developer Feedback</h2>
          <p className="text-md text-zinc-400">
            {data.text || "Undefined key"}
          </p>
          <p>
            <span className="text-zinc-300">Score: </span>
            <span className="font-bold">
              {data.score}
              /10
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
