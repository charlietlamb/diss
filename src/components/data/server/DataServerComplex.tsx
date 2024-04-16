import * as d3 from "d3";
import { JSDOM } from "jsdom";

export default async function DataServerComplex() {
  const response = await fetch(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
  );
  const text = await response.text();
  const numbers = text
    .split(",")
    .filter((char) => !isNaN(parseInt(char, 10)) && !char.includes("/"));
  const width = 960;
  const height = 500;
  const n = 20;
  const m = 200;
  const k = 10;
  const offset = d3.stackOffsetWiggle;
  const x = d3
    .scaleLinear()
    .domain([0, m - 1])
    .range([0, width]);
  const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
  const z = d3.interpolateCool;

  const area = d3
    .area()
    .x((d, i) => x(i)!)
    .y0((d) => y(d[0])!)
    .y1((d) => y(d[1])!);

  const stack = d3
    .stack()
    .keys(d3.range(n) as any)
    .offset(offset)
    .order(d3.stackOrderNone);

  function randomize() {
    const layers = stack(
      d3.transpose(
        Array.from({ length: n }, () => bumps(m, k, numbers)),
      ) as any,
    );
    y.domain([
      d3.min(layers, (l) => d3.min(l, (d) => d[0]))!,
      d3.max(layers, (l) => d3.max(l, (d) => d[1]))!,
    ]);
    return layers;
  }

  function generateSvg() {
    const dom = new JSDOM();
    const svg = d3
      .select(dom.window.document.body)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

    const path = svg
      .selectAll("path")
      .data(randomize())
      .join("path")
      .attr("d", area as any)
      .attr("fill", () => z(Math.random()));

    return dom.window.document.body.innerHTML;
  }

  const svgHtml = generateSvg();
  return (
    // <ServerWrap>
    <div className="flex h-full min-h-full w-full flex-col gap-4 p-4">
      <div className="flex flex-col items-center">
        <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
          Server Side Data: Complex
        </h1>
        <h2 className="font-xl text-zinc-400">
          20 Layers, 200 Samples, 10 Bumps
        </h2>
        <h2 className="font-xl text-zinc-400">
          Data generated using 300,000+ numbers from the COVID-19 dataset
        </h2>
        <div dangerouslySetInnerHTML={{ __html: svgHtml }} />
      </div>
    </div>
    // </ServerWrap>
  );
}

// Helper function to generate random bumps
function bumps(n: number, m: number, numbers: string[]): number[] {
  const a = [];
  for (let i = 0; i < n; ++i) {
    a[i] = 0;
  }
  for (let j = 0; j < m; ++j) {
    const x = 1 / (0.1 + Math.random());
    const y = 2 * Math.random() - 0.5;
    const z = 10 / (0.1 + Math.random());
    const bumpInfluence = parseFloat(randomElement(numbers));
    for (let i = 0; i < n; i++) {
      let w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w) * bumpInfluence;
    }
  }
  return a;
}

// Helper function to pick a random element from an array
function randomElement(array: string[]): string {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
