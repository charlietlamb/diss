"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/state/hooks";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    onClick: () => void;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  const { mode } = useAppSelector((state) => state.render);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 bottom-4 z-[5000]  mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full  bg-zinc-950/90 px-4 py-2  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ring-2 ring-zinc-400",
          className,
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <button
            key={`link=${idx}`}
            className={cn(
              "group relative flex items-center justify-center space-x-1 text-neutral-50 hover:text-neutral-300",
            )}
            onClick={() => navItem.onClick()}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden text-sm sm:block">{navItem.name}</span>
            <span
              className={cn(
                "absolute inset-x-0 -bottom-px mx-auto h-[2px] bg-gradient-to-r from-transparent via-blue-500  to-transparent opacity-0 transition-all group-hover:opacity-80",
                mode === navItem.name.toLowerCase() &&
                  "opacity-100 group-hover:opacity-100",
              )}
            />
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
