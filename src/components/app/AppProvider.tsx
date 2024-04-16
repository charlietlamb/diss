"use client";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setMode } from "@/state/render/renderSlice";
import { Blend, Server, User } from "lucide-react";
import { FloatingNav } from "../ui/floating-navbar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useAppSelector((state) => state.render);
  const router = useRouter();
  const pathname = usePathname();
  const type = pathname.split("/")[2];
  const currentMode = pathname.split("/")[3];
  const currentComplexity = pathname.split("/")[4];
  const dispatch = useAppDispatch();
  const [init, setInit] = useState(false);
  const navItems = [
    {
      name: "Client",
      icon: <User className="h-4 w-4 text-zinc-200" />,
      onClick: () => dispatch(setMode("client")),
    },
    {
      name: "Server",
      onClick: () => dispatch(setMode("server")),
      icon: <Server className="h-4 w-4 text-zinc-200" />,
    },
  ];
  useEffect(() => {
    if (currentMode) dispatch(setMode(currentMode));
    setInit(true);
  }, [currentMode, setInit, dispatch]);
  useEffect(() => {
    console.log("trying to change mode to ", mode);
    if (mode !== currentMode && type && init) {
      if (currentComplexity) {
        window.location.href = `/app/${type}/${mode}/${currentComplexity}`;
      } else {
        window.location.href = `/app/${type}/${mode}`;
      }
      toast(`Successfully switched to ${mode} rendering`, { icon: "🚀" });
    }
  }, [mode, router, type, currentMode, init, currentComplexity]);
  return (
    <>
      {children}
      <FloatingNav navItems={navItems}></FloatingNav>
    </>
  );
}
