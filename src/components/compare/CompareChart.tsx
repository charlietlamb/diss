import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
export default function CompareChart({ data1 }: { data1: Load[] }) {
  if (!data1.length) return "data not found";
  const data = data1.map((load, index) => ({ goal: load.time, index }));
  const method = data1[0].method;
  const render = data1[0].render;
  const complexity = data1[0].complexity;
  return (
    <div className="flex h-full flex-grow flex-col items-center justify-center gap-y-8 bg-black">
      <div className="flex flex-col items-center">
        <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
          {`${render.slice(0, 1).toUpperCase() + render.slice(1)} Side ${method.slice(0, 1).toUpperCase() + method.slice(1)}: ${complexity.slice(0, 1).toUpperCase() + complexity.slice(1)}`}
        </h1>
        <h2 className="font-xl text-zinc-400">24 randomly generated values</h2>
      </div>
      <div className="h-[60vh] w-[40vw]">
        <ResponsiveContainer width="100%">
          <BarChart data={data}>
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
    </div>
  );
}
