import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChartBig,
  Database,
  Eye,
  FolderInput,
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
    description: "Compare the evolution of forms and their impact on society.",
    href: "form",
    header: <Skeleton />,
    icon: <FolderInput className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Chat Comparison",
    href: "chart",
    header: <Skeleton />,
    icon: <BarChartBig className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Data Comparison",
    href: "data",
    header: <Skeleton />,
    icon: <Database className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Render Visualiser",
    href: "visualiser",
    header: <Skeleton />,
    icon: <Eye className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Previous Results",
    href: "results",
    header: <Skeleton />,
    icon: <TestTube2 className="h-4 w-4 text-neutral-500" />,
  },
];
