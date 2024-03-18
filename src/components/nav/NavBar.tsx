"use client";

import { FerrisWheel } from "lucide-react";
import NavItem from "./NavItem";
import Link from "next/link";
import { useAppSelector } from "@/state/hooks";

export default function NavBar() {
  const { mode } = useAppSelector((state) => state.render);
  return (
    <div className="relative z-50 flex w-full items-center justify-between rounded-md border-b-2 border-zinc-200 bg-black px-4 py-2">
      <Link href="/">
        <FerrisWheel
          className="size-12 text-zinc-200"
          strokeWidth={1.5}
        ></FerrisWheel>
      </Link>
      <menu className="flex gap-x-4">
        <NavItem text="App" href="/app"></NavItem>
        <NavItem text="Form" href={`/app/form/${mode}`}></NavItem>
        <NavItem text="Charts" href={`/app/charts/${mode}`}></NavItem>
        <NavItem text="Data" href={`/app/data/${mode}`}></NavItem>
      </menu>
    </div>
  );
}
