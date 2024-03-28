import { pageMap } from "@/data/app/pageMap";
import { redirect } from "next/navigation";

export default function page({
  params,
}: {
  params: { method: string; render: string; complexity: string };
}) {
  if (
    ["form", "charts", "data"].indexOf(params.method) === -1 ||
    ["client", "server", "hybrid"].indexOf(params.render) === -1 ||
    ["simple", "average", "complex"].indexOf(params.complexity) === -1
  )
    return redirect("/app");
  return pageMap.get(params.method)?.get(params.render)?.get(params.complexity);
}
