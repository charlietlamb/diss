import { FerrisWheel } from "lucide-react";
import NavItem from "./NavItem";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="relative z-50 flex w-full items-center justify-between rounded-md border-b-2 border-zinc-200 bg-zinc-950/50 px-4 py-2">
      <Link href="/">
        <FerrisWheel
          className="size-12 text-zinc-200"
          strokeWidth={1.5}
        ></FerrisWheel>
      </Link>
      <menu className="flex gap-x-4">
        <NavItem text="App" href="app"></NavItem>
        <NavItem text="Client" href="client"></NavItem>
        <NavItem text="Server" href="server"></NavItem>
      </menu>
    </div>
  );
}
