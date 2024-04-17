import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavItemProps {
  text: string;
  href: string;
}

export default function NavItem({ text, href }: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isPath =
    pathname.includes(href) &&
    (href !== "/app" ||
      (!pathname.includes("form") &&
        !pathname.includes("charts") &&
        !pathname.includes("data")));

  const isApp = text === "Results" || text === "Compare Tests";
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-transparent p-2 transition-all hover:bg-zinc-800/80",
        isPath && "bg-zinc-800/80",
      )}
    >
      {href.includes("/app/") ? (
        <div
          onClick={() =>
            isApp ? router.push(href) : (window.location.href = href)
          }
          className="cursor-pointer bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-center text-lg font-bold text-transparent decoration-2 hover:underline"
        >
          {text}
        </div>
      ) : (
        <button
          onClick={() =>
            isApp ? router.push(href) : (window.location.href = href)
          }
          className="cursor-pointer bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-center text-lg font-bold text-transparent decoration-2 hover:underline"
        >
          {text}
        </button>
      )}
    </div>
  );
}
