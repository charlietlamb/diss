import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Developer from "../developer/Developer";
export default function CompareChart({ data1 }: { data1: Load[] }) {
  if (!data1.length) return "data not found";
  const method = data1[0].method;
  const render = data1[0].render;
  const complexity = data1[0].complexity;
  const isSubmit = method === "submit";
  const fcp = data1.map((load, index) => ({
    goal: !isSubmit ? load.fcp : load.time,
    index,
  }));
  const lcp = data1.map((load, index) => ({ goal: load.lcp, index }));
  const fid = data1.map((load, index) => ({ goal: load.fid, index }));
  const path = `${method}/${render}/${complexity}`;
  return (
    <div className="flex h-full flex-grow flex-col items-center gap-y-8 bg-black">
      <div className="flex flex-col items-center">
        <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
          {`${render.slice(0, 1).toUpperCase() + render.slice(1)} Side ${method.slice(0, 1).toUpperCase() + method.slice(1)}: ${complexity.slice(0, 1).toUpperCase() + complexity.slice(1)}`}
        </h1>
      </div>
      {!isSubmit && (
        <>
          <h3 className="text-4xl font-bold text-zinc-200">
            First Contentful Paint
          </h3>
          <div className="h-[60vh] w-[40vw]">
            <ResponsiveContainer width="100%">
              <BarChart data={fcp}>
                <Bar
                  dataKey="goal"
                  style={
                    {
                      fill: "#E4E4E7",
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                />
                <XAxis dataKey="index" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <h3 className="text-4xl font-bold text-zinc-200">
            Largest Contentful Paint
          </h3>
          <div className="h-[60vh] w-[40vw]">
            <ResponsiveContainer width="100%">
              <BarChart data={lcp}>
                <Bar
                  dataKey="goal"
                  style={
                    {
                      fill: "#E4E4E7",
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                />
                <XAxis dataKey="index" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <h3 className="text-4xl font-bold text-zinc-200">
            Cumulative Layout Shift
          </h3>
          <div className="h-[60vh] w-[40vw]">
            <ResponsiveContainer width="100%">
              <BarChart data={fid}>
                <Bar
                  dataKey="goal"
                  style={
                    {
                      fill: "#E4E4E7",
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                />
                <XAxis dataKey="index" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      {isSubmit && (
        <>
          <h3 className="text-4xl font-bold text-zinc-200">Submit Time</h3>
          <div className="h-[60vh] w-[40vw]">
            <ResponsiveContainer width="100%">
              <BarChart data={fcp}>
                <Bar
                  dataKey="goal"
                  style={
                    {
                      fill: "#E4E4E7",
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                />
                <XAxis dataKey="index" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      <Developer addText inline initKey={path} />
    </div>
  );
}
