import Results from "@/components/results/Results";
import ResultsProvider from "@/components/results/ResultsProvider";

export default async function page() {
  return (
    <ResultsProvider>
      <Results />
    </ResultsProvider>
  );
}
