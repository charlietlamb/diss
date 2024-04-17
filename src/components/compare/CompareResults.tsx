import { useCompareContext } from "./context/compareContext";

export default function CompareResults() {
  const { data1, data2 } = useCompareContext();
  if (!data1.length || !data2.length) return null;
  const averageFCP1 =
    data1.reduce((sum, item) => (item.fcp ? sum + item.fcp : sum), 0) /
    data1.length;
  const averageFCP2 =
    data2.reduce((sum, item) => (item.fcp ? sum + item.fcp : sum), 0) /
    data2.length;

  const fastestFCP = averageFCP1 < averageFCP2 ? data1 : data2;

  const longestFCP1 = data1.reduce((max, item) => Math.max(max, item.time), 0);
  const longestFCP2 = data2.reduce((max, item) => Math.max(max, item.time), 0);

  const shortestFCP1 = data1.reduce(
    (min, item) => Math.min(min, item.time),
    Infinity,
  );
  const shortestFCP2 = data2.reduce(
    (min, item) => Math.min(min, item.time),
    Infinity,
  );

  const longestFCP = longestFCP1 > longestFCP2 ? data1 : data2;
  const shortestFCP = shortestFCP1 < shortestFCP2 ? data1 : data2;

  const averageLCP1 =
    data1.reduce((sum, item) => (item.lcp ? sum + item.lcp : sum), 0) /
    data1.length;
  const averageLCP2 =
    data2.reduce((sum, item) => (item.lcp ? sum + item.lcp : sum), 0) /
    data2.length;

  const fastestLCP = averageLCP1 < averageLCP2 ? data1 : data2;

  const longestLCP1 = data1.reduce((max, item) => Math.max(max, item.time), 0);
  const longestLCP2 = data2.reduce((max, item) => Math.max(max, item.time), 0);

  const shortestLCP1 = data1.reduce(
    (min, item) => Math.min(min, item.time),
    Infinity,
  );
  const shortestLCP2 = data2.reduce(
    (min, item) => Math.min(min, item.time),
    Infinity,
  );

  const longestLCP = longestLCP1 > longestLCP2 ? data1 : data2;
  const shortestLCP = shortestLCP1 < shortestLCP2 ? data1 : data2;

  const averageINP1 =
    data1.reduce((sum, item) => (item.inp ? sum + item.inp : sum), 0) /
    data1.length;
  const averageINP2 =
    data2.reduce((sum, item) => (item.inp ? sum + item.inp : sum), 0) /
    data2.length;

  const fastestINP = averageINP1 < averageINP2 ? data1 : data2;

  const longestINP1 = data1.reduce((max, item) => Math.max(max, item.time), 0);
  const longestINP2 = data2.reduce((max, item) => Math.max(max, item.time), 0);

  const shortestINP1 = data1.reduce(
    (min, item) => Math.min(min, item.time),
    Infinity,
  );
  const shortestINP2 = data2.reduce(
    (min, item) => Math.min(min, item.time),
    Infinity,
  );

  const longestINP = longestINP1 > longestINP2 ? data1 : data2;
  const shortestINP = shortestINP1 < shortestINP2 ? data1 : data2;

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          Fastest Avg FCP:{" "}
          <span className="font-bold">{`${fastestFCP[0].method}/${fastestFCP[0].render}/${fastestFCP[0].complexity}`}</span>
        </h3>
        <p>
          Time:{" "}
          <span className="font-bold">
            {fastestFCP === data1 ? averageFCP1 : averageFCP2} ms
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          Slowest FCP:{" "}
          <span className="font-bold">
            {" "}
            {`${longestFCP[0].method}/${longestFCP[0].render}/${longestFCP[0].complexity}`}{" "}
          </span>
        </h3>
        <p>
          Time:{" "}
          <span className="font-bold">
            {longestFCP === data1 ? longestFCP1 : longestFCP2} ms
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          Fastest FCP:{" "}
          <span className="font-bold">{`${shortestFCP[0].method}/${shortestFCP[0].render}/${shortestFCP[0].complexity}`}</span>
        </h3>
        <p>
          Time:{" "}
          <span className="font-bold">
            {" "}
            {shortestFCP === data1 ? shortestFCP1 : shortestFCP2} ms
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          Fastest Avg LCP:{" "}
          <span className="font-bold">{`${fastestLCP[0].method}/${fastestLCP[0].render}/${fastestLCP[0].complexity}`}</span>
        </h3>
        <p>
          Time:{" "}
          <span className="font-bold">
            {fastestLCP === data1 ? averageLCP1 : averageLCP2} ms
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          Slowest LCP:{" "}
          <span className="font-bold">
            {" "}
            {`${longestLCP[0].method}/${longestLCP[0].render}/${longestLCP[0].complexity}`}{" "}
          </span>
        </h3>
        <p>
          Time:{" "}
          <span className="font-bold">
            {longestLCP === data1 ? longestLCP1 : longestLCP2} ms
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          Fastest LCP:{" "}
          <span className="font-bold">{`${shortestLCP[0].method}/${shortestLCP[0].render}/${shortestLCP[0].complexity}`}</span>
        </h3>
        <p>
          Time:{" "}
          <span className="font-bold">
            {" "}
            {shortestLCP === data1 ? shortestLCP1 : shortestLCP2} ms
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          Lowest Avg INP:{" "}
          <span className="font-bold">{`${fastestINP[0].method}/${fastestINP[0].render}/${fastestINP[0].complexity}`}</span>
        </h3>
        <p>
          Value:{" "}
          <span className="font-bold">
            {fastestINP === data1 ? averageINP1 : averageINP2}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          Largest INP:{" "}
          <span className="font-bold">
            {" "}
            {`${longestINP[0].method}/${longestINP[0].render}/${longestINP[0].complexity}`}{" "}
          </span>
        </h3>
        <p>
          Value:{" "}
          <span className="font-bold">
            {longestINP === data1 ? longestINP1 : longestINP2}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <h3 className="flex whitespace-nowrap">
          Lowest INP:{" "}
          <span className="font-bold">{`${shortestINP[0].method}/${shortestINP[0].render}/${shortestINP[0].complexity}`}</span>
        </h3>
        <p>
          Value:{" "}
          <span className="font-bold">
            {" "}
            {shortestINP === data1 ? shortestINP1 : shortestINP2}
          </span>
        </p>
      </div>
    </div>
  );
}
