import { CSSProperties } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";

export default function ChartsServer({
  data,
  wider = false,
  text,
  description,
}: {
  data: { goal: number; index: number }[];
  wider?: boolean;
  text: string;
  description: string;
}) {
  let barWidth = (100 / data.length) * 0.9; // reduce bar width by 10%
  let gapWidth = 100 / data.length - barWidth; // calculate gap width

  let xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([gapWidth / 2, 100 - gapWidth / 2]);
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.goal)) ?? 0])
    .range([100, 0]);
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
          {`Server Side Charts: ${text}`}
        </h1>
        <h2 className="font-xl text-zinc-400">{description}</h2>
      </div>
      <div
        className="relative min-h-[80%] w-[80%]"
        style={
          {
            "--marginTop": "6px",
            "--marginRight": "8px",
            "--marginBottom": "25px",
            "--marginLeft": "25px",
          } as CSSProperties
        }
      >
        {/* X axis */}
        <svg
          className="absolute inset-0
            h-[calc(100%-var(--marginTop))]
            w-[calc(100%-var(--marginLeft)-var(--marginRight))]
            translate-x-[var(--marginLeft)]
            translate-y-[var(--marginTop)]
            overflow-visible
          "
        >
          {data.map((dat, i) => (
            <g key={i} className="overflow-visible font-medium text-gray-500">
              <text
                x={`${xScale(dat.index) + barWidth / 2}%`}
                y="100%"
                textAnchor="middle"
                fill="currentColor"
                className="@sm:inline hidden text-sm"
              >
                {data[i].index}
              </text>
              <text
                x={`${xScale(dat.index)}%`}
                y="100%"
                textAnchor="middle"
                fill="currentColor"
                className={cn("@sm:hidden text-xs", wider && "text-[.4rem]")}
              >
                {data[i].index}
              </text>
            </g>
          ))}
        </svg>
        {/* Y axis */}
        <svg
          className="absolute inset-0
                      h-[calc(100%-var(--marginTop)-var(--marginBottom))]
                      translate-y-[var(--marginTop)]
                      overflow-visible
                  "
        >
          <g className="translate-x-4">
            {yScale
              .ticks(8)
              .map(yScale.tickFormat(8, "d"))
              .map((goal, i) => (
                <text
                  key={i}
                  y={`${yScale(+goal)}%`}
                  alignmentBaseline="middle"
                  textAnchor="end"
                  className="text-xs tabular-nums text-gray-600"
                  fill="currentColor"
                >
                  {goal}
                </text>
              ))}
          </g>
        </svg>
        {/* Chart area */}
        <svg
          className="absolute inset-0
                      h-[calc(100%-var(--marginTop)-var(--marginBottom))]
                      w-[calc(100%-var(--marginLeft)-var(--marginRight))]
                      translate-x-[var(--marginLeft)]
                      translate-y-[var(--marginTop)]
                      overflow-visible
                  "
        >
          <svg
            viewBox="0 0 100 100"
            className="max-w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {yScale
              .ticks(8)
              .map(yScale.tickFormat(8, "d"))
              .map((active, i) => (
                <g
                  transform={`translate(0,${yScale(+active)})`}
                  className="text-gray-700"
                  key={i}
                >
                  <line
                    x1={0}
                    x2={100}
                    stroke="currentColor"
                    strokeDasharray="6,5"
                    strokeWidth={0.5}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            {/* Bars */}
            {data.map((d) => (
              <rect
                key={d.index.toString()}
                x={`${xScale(d.index) - barWidth / 2}%`} // adjust x position
                y={`${yScale(d.goal)}%`}
                width={`${barWidth}%`}
                height={`${100 - yScale(d.goal)}%`}
                fill="currentColor"
                className="text-zinc-200"
              />
            ))}
          </svg>
        </svg>
      </div>
    </div>
  );
}
