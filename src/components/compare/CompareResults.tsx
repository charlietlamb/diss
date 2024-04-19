import { useCompareContext } from "./context/compareContext";

export default function CompareResults() {
  const { data1, data2 } = useCompareContext();
  if (!data1.length || !data2.length) return null;
  const isSubmit =
    data1[0].method.includes("submit") && data2[0].method.includes("submit")
      ? true
      : false;
  const isNormal =
    !data1[0].method.includes("submit") && !data2[0].method.includes("submit")
      ? true
      : false;
  const averageFCP1 =
    data1.reduce((sum, item) => (item.fcp ? sum + item.fcp : sum), 0) /
    data1.length;
  const averageFCP2 =
    data2.reduce((sum, item) => (item.fcp ? sum + item.fcp : sum), 0) /
    data2.length;

  const fastestFCP = averageFCP1 < averageFCP2 ? data1 : data2;

  const longestFCP1 = data1.reduce(
    (max, item) => Math.max(max, item.fcp || 0),
    0,
  );
  const longestFCP2 = data2.reduce(
    (max, item) => Math.max(max, item.fcp || 0),
    0,
  );

  const shortestFCP1 = data1.reduce(
    (min, item) => Math.min(min, item.fcp || 0),
    Infinity,
  );
  const shortestFCP2 = data2.reduce(
    (min, item) => Math.min(min, item.fcp || 0),
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

  const longestLCP1 = data1.reduce(
    (max, item) => Math.max(max, item.lcp || 0),
    0,
  );
  const longestLCP2 = data2.reduce(
    (max, item) => Math.max(max, item.lcp || 0),
    0,
  );

  const shortestLCP1 = data1.reduce(
    (min, item) => Math.min(min, item.lcp || 0),
    Infinity,
  );
  const shortestLCP2 = data2.reduce(
    (min, item) => Math.min(min, item.lcp || 0),
    Infinity,
  );

  const longestLCP = longestLCP1 > longestLCP2 ? data1 : data2;
  const shortestLCP = shortestLCP1 < shortestLCP2 ? data1 : data2;

  const averageFID1 =
    data1.reduce((sum, item) => (item.fid ? sum + item.fid : sum), 0) /
    data1.length;
  const averageFID2 =
    data2.reduce((sum, item) => (item.fid ? sum + item.fid : sum), 0) /
    data2.length;

  const fastestFID = averageFID1 < averageFID2 ? data1 : data2;

  const longestFID1 = data1.reduce(
    (max, item) => Math.max(max, item.fid || 0),
    0,
  );
  const longestFID2 = data2.reduce(
    (max, item) => Math.max(max, item.fid || 0),
    0,
  );

  const shortestFID1 = data1.reduce(
    (min, item) => Math.min(min, item.fid || 0),
    Infinity,
  );
  const shortestFID2 = data2.reduce(
    (min, item) => Math.min(min, item.fid || 0),
    Infinity,
  );

  const longestFID = longestFID1 > longestFID2 ? data1 : data2;
  const shortestFID = shortestFID1 < shortestFID2 ? data1 : data2;

  const averageTime1 =
    data1.reduce((sum, item) => (item.time ? sum + item.time : sum), 0) /
    data1.length;
  const averageTime2 =
    data2.reduce((sum, item) => (item.time ? sum + item.time : sum), 0) /
    data2.length;

  const fastestTime = averageTime1 < averageTime2 ? data1 : data2;

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

  const longestTime = longestTime1 > longestTime2 ? data1 : data2;
  const shortestTime = shortestTime1 < shortestTime2 ? data1 : data2;

  return (
    <>
      {isNormal && (
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
              Lowest Avg FID:{" "}
              <span className="font-bold">{`${fastestFID[0].method}/${fastestFID[0].render}/${fastestFID[0].complexity}`}</span>
            </h3>
            <p>
              Value:{" "}
              <span className="font-bold">
                {fastestFID === data1 ? averageFID1 : averageFID2}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
            <h3 className="flex whitespace-nowrap">
              Largest FID:{" "}
              <span className="font-bold">
                {" "}
                {`${longestFID[0].method}/${longestFID[0].render}/${longestFID[0].complexity}`}{" "}
              </span>
            </h3>
            <p>
              Value:{" "}
              <span className="font-bold">
                {longestFID === data1 ? longestFID1 : longestFID2}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
            <h3 className="flex whitespace-nowrap">
              Lowest FID:{" "}
              <span className="font-bold">{`${shortestFID[0].method}/${shortestFID[0].render}/${shortestFID[0].complexity}`}</span>
            </h3>
            <p>
              Value:{" "}
              <span className="font-bold">
                {" "}
                {shortestFID === data1 ? shortestFID1 : shortestFID2}
              </span>
            </p>
          </div>
        </div>
      )}
      {isSubmit && (
        <div className="grid w-full grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
            <h3 className="flex whitespace-nowrap">
              Fastest Avg Time:{" "}
              <span className="font-bold">{`${fastestTime[0].method}/${fastestTime[0].render}/${fastestTime[0].complexity}`}</span>
            </h3>
            <p>
              Time:{" "}
              <span className="font-bold">
                {fastestTime === data1 ? averageTime1 : averageTime2} ms
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
            <h3 className="flex whitespace-nowrap">
              Slowest Time:{" "}
              <span className="font-bold">
                {" "}
                {`${longestTime[0].method}/${longestTime[0].render}/${longestTime[0].complexity}`}{" "}
              </span>
            </h3>
            <p>
              Time:{" "}
              <span className="font-bold">
                {longestTime === data1 ? longestTime1 : longestTime2} ms
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
            <h3 className="flex whitespace-nowrap">
              Fastest Time:{" "}
              <span className="font-bold">{`${shortestTime[0].method}/${shortestTime[0].render}/${shortestTime[0].complexity}`}</span>
            </h3>
            <p>
              Time:{" "}
              <span className="font-bold">
                {" "}
                {shortestTime === data1 ? shortestTime1 : shortestTime2} ms
              </span>
            </p>
          </div>
        </div>
      )}
      {!isNormal && !isSubmit && (
        <p className="w-full text-center text-zinc-400">
          You cannot compare a submit with a render.
        </p>
      )}
    </>
  );
}
