import { FerrisWheel } from "lucide-react";
import NavItem from "./NavItem";

export default function NavBar() {
  return (
    <div className="fixed z-50 flex w-full items-center justify-between border-b-2 border-zinc-700 bg-zinc-100/50 px-4 py-2">
      <div>
        <FerrisWheel className="size-12 text-zinc-600"></FerrisWheel>
      </div>
      <div className="flex">
        <NavItem text="Home"></NavItem>
        <NavItem text="Client"></NavItem>
        <NavItem text="Server"></NavItem>
      </div>
    </div>
  );
}
