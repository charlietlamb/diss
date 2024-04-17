import Results from "@/components/results/Results";
import ResultsProvider from "@/components/results/ResultsProvider";

export default async function page({
  params,
}: {
  params: { method: string; render: string; complexity: string };
}) {
  return (
    <ResultsProvider>
      <Results />
    </ResultsProvider>
  );
}
