import {
  BarChartBig,
  Database,
  Eye,
  FolderInput,
  LucideIcon,
} from "lucide-react";

export const iconMap: IconMap = {
  form: FolderInput,
  chart: BarChartBig,
  data: Database,
  visualiser: Eye,
};

type IconMap = { [key: string]: LucideIcon };
