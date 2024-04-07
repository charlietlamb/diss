import CompareChart from "./CompareChart";
import { useCompareContext } from "./context/compareContext";

export default function CompareCharts() {
  const { data1, data2 } = useCompareContext();
  return (
    <div className="grid w-full min-w-full grid-cols-2 gap-4 p-4">
      <CompareChart data1={data1} />
      <CompareChart data1={data2} />
    </div>
  );
}
