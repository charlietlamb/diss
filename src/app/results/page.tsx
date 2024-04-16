import Results from "@/components/results/Results";
import ResultsProvider from "@/components/results/ResultsProvider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("loads")
    .select()
    .eq("method", "form")
    .eq("render", "client")
    .eq("complexity", "simple");
  if (error) throw error;
  return (
    <ResultsProvider>
      <Results loadData={data} />
    </ResultsProvider>
  );
}
