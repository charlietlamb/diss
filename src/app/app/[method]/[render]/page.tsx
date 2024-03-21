import { redirect } from "next/navigation";

export default function page({
  params,
}: {
  params: { method: string; render: string };
}) {
  return redirect(`/app/${params.method}/${params.render}/simple`);
}
