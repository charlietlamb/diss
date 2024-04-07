import {
  SkeletonOne,
  SkeletonThree,
  SkeletonTwo,
} from "@/components/ui/bento-grid";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChartBig,
  Database,
  Eye,
  FolderInput,
  GitCompareArrows,
  TestTube2,
} from "lucide-react";

export type AppData = {
  title: string;
  href: string;
  header: React.ReactNode;
  icon: React.ReactNode;
  description?: string; // Optional description property
};

export const appData: AppData[] = [
  {
    title: "Form Comparison",
    description:
      "Compare the load times and effectiveness of client, server and hybrid methods when rendering forms.",
    href: "/app/form/client/simple",
    header: <SkeletonOne />,
    icon: <FolderInput className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Chart Comparison",
    description:
      "Compare the load times and effectiveness of client, server and hybrid methods when rendering charts.",
    href: "/app/charts/client/simple",
    header: <SkeletonTwo />,
    icon: <BarChartBig className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Data Comparison",
    description:
      "Compare the load times and effectiveness of client, server and hybrid methods when rendering large data.",
    href: "/app/data/client/simple",
    header: <SkeletonThree />,
    icon: <Database className="h-4 w-4 text-neutral-500" />,
  },
  // {
  //   title: "Render Visualiser",
  //   description:
  //     "Visualise the loading processes of client, server and hybrid methods.",
  //   href: "visualiser",
  //   header: (
  //     <div className="flex h-full flex-col justify-center">
  //       <GlowingStarsBackgroundCard className="flex h-full max-h-[8rem] w-full items-center justify-center" />
  //     </div>
  //   ),
  //   icon: <Eye className="h-4 w-4 text-neutral-500" />,
  // },
  {
    title: "Results",
    description:
      "View previous results when comparing client, server and hybrid methods.",
    href: "/results/form",
    header: (
      <div className="flex h-full flex-col justify-center">
        <EvervaultCard text="hover" />
      </div>
    ),
    icon: <TestTube2 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Compare",
    description: "Compare different tests and find out key statistics.",
    href: "/compare",
    header: (
      <div className="flex h-full flex-col justify-center">
        <EvervaultCard text="hover" compare />
      </div>
    ),
    icon: <GitCompareArrows className="h-4 w-4 text-neutral-500" />,
  },
];
