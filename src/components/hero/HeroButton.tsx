"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function HeroButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="bg-zinc-200 text-2xl font-semibold text-zinc-950 ring-2 ring-zinc-200 transition-all duration-300 hover:bg-zinc-950 hover:text-zinc-200 hover:ring-zinc-200"
      onClick={() => {
        router.push("/app");
      }}
    >
      Start testing...
    </Button>
  );
}
