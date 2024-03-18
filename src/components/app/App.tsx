"use client";

import { useAppSelector } from "@/state/hooks";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import AppHeading from "./AppHeading";
import { appData } from "./data/appData";

export default function App() {
  const { mode } = useAppSelector((state) => state.render);
  return (
    <div className="flex flex-col gap-y-4 py-8">
      <AppHeading></AppHeading>
      <BentoGrid className="mx-auto max-w-4xl">
        {appData.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            href={item.href + "/" + mode}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
