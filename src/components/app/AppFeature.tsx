import Link from "next/link";
import { AppData } from "./data/appData";
import { iconMap } from "./data/iconData";

export default function AppFeature({ featureTitle, href }: AppData) {
  const Icon = iconMap[href];
  return (
    <Link
      href={`app/${href}`}
      className="rounded-xl bg-zinc-950 ring-2 ring-zinc-200 transition-all hover:rounded-md"
    >
      <div className="flex gap-x-2">
        <Icon className="text-zinc-200" />
        <h2 className="text-lg font-semibold text-zinc-200">{featureTitle}</h2>
      </div>
    </Link>
  );
}
