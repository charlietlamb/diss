import ChartsServer from "./ChartsServer";

export default async function ChartsServerAverage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/data`);
  let data;
  if (response.ok) {
    console.log("setting data");
    data = await response.json();
  } else {
    throw new Error("Failed to fetch data");
  }
  return (
    <ChartsServer
      data={data}
      text="Average"
      description="50 values from an API"
    />
  );
}
