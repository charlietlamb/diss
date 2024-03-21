import { redirect } from "next/navigation";

export default function page({ params }: { params: { method: string } }) {
  return redirect(`/app/${params.method}/client/simple`);
}
