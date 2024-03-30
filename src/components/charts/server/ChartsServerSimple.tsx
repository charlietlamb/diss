import ServerWrap from "@/components/ServerWrap";
import ChartsServer from "./ChartsServer";

export default async function ChartsServerSimple() {
  const startTime = performance.now();
  const data24 = Array.from({ length: 24 }, () => ({
    goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
  }));

  const data = data24.map((item, index) => ({
    ...item,
    index,
  }));
  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/toast`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time: performance.now() - startTime,
      key: "charts/server/simple",
    }),
  });
  return (
    <ServerWrap>
      <ChartsServer
        data={data}
        text="Simple"
        description="24 randomly generated values"
      />
    </ServerWrap>
  );
}
