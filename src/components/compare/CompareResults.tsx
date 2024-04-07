import { useCompareContext } from "./context/compareContext";

export default function CompareResults() {
  const { data1, data2 } = useCompareContext();
  const averageTime1 =
    data1.reduce((sum, item) => sum + item.time, 0) / data1.length;
  const averageTime2 =
    data2.reduce((sum, item) => sum + item.time, 0) / data2.length;

  const fastest = averageTime1 < averageTime2 ? data1 : data2;

  const longestTime1 = data1.reduce((max, item) => Math.max(max, item.time), 0);
  const longestTime2 = data2.reduce((max, item) => Math.max(max, item.time), 0);

  const shortestTime1 = data1.reduce(
    (min, item) => Math.min(min, item.time),
    Infinity,
  );
  const shortestTime2 = data2.reduce(
    (min, item) => Math.min(min, item.time),
    Infinity,
  );

  const longest = longestTime1 > longestTime2 ? data1 : data2;
  const shortest = shortestTime1 < shortestTime2 ? data1 : data2;

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          <span className="font-bold">Fastest Average: </span>{" "}
          {`${fastest[0].method}/${fastest[0].render}/${fastest[0].complexity}`}
        </h3>
        <p>
          <span className="font-bold">Average time:</span>{" "}
          {fastest === data1 ? averageTime1 : averageTime2} ms
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          <span className="font-bold">Longest: </span>{" "}
          {`${longest[0].method}/${longest[0].render}/${longest[0].complexity}`}
        </h3>
        <p>
          <span className="font-bold">Longest time:</span>{" "}
          {longest === data1 ? longestTime1 : longestTime2} ms
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          <span className="font-bold">Fastest: </span>{" "}
          {`${shortest[0].method}/${shortest[0].render}/${shortest[0].complexity}`}
        </h3>
        <p>
          <span className="font-bold">Fastest time:</span>{" "}
          {shortest === data1 ? shortestTime1 : shortestTime2} ms
        </p>
      </div>
    </div>
  );
}
