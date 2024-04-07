import Results from "@/components/results/Results";
import ResultsProvider from "@/components/results/ResultsProvider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function page({
  params,
}: {
  params: { method: string; render: string; complexity: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("loads")
    .select()
    .eq("method", params.method)
    .eq("render", params.render)
    .eq("complexity", params.complexity);
  if (error) throw error;
  return (
    <ResultsProvider>
      <Results loadData={data} />
    </ResultsProvider>
  );
}
