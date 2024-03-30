import ServerWrap from "@/components/ServerWrap";
import ChartsServer from "./ChartsServer";

export default async function ChartsServerAverage() {
  const startTime = performance.now();
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/data`);
  let data;
  if (response.ok) {
    console.log("setting data");
    data = await response.json();
  } else {
    throw new Error("Failed to fetch data");
  }
  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/toast`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time: performance.now() - startTime,
      key: "charts/server/average",
    }),
  });
  return (
    <ServerWrap>
      <ChartsServer
        data={data}
        text="Average"
        description="50 values from an API"
      />
    </ServerWrap>
  );
}
