import Compare from "@/components/compare/Compare";
import { getLoads } from "@/components/compare/functions/getLoads";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const initData1 = await getLoads(supabase, "form", "client", "simple");
  const initData2 = await getLoads(supabase, "form", "server", "simple");
  return <Compare initData1={initData1} initData2={initData2} />;
}
