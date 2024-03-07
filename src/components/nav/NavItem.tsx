import Link from "next/link";
import { Button } from "../ui/button";

interface NavItemProps {
  text: string;
  href: string;
}

export default function NavItem({ text, href }: NavItemProps) {
  return (
    <Link
      href={href}
      className="text-lg text-zinc-200 decoration-2 hover:underline"
    >
      {text}
    </Link>
  );
}
