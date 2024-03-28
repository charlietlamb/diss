import { DataItem } from "../client/ChartsClientComplex";
import ChartsServer from "./ChartsServer";

export default async function ChartsServerComplex() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/data-complex`,
  );
  let data;
  if (response.ok) {
    console.log("setting data");
    const newData: DataItem[] = await response.json();

    const groupedData = newData.reduce((acc: DataItem[][], curr, index) => {
      const groupIndex = Math.floor(index / 10);

      if (!acc[groupIndex]) {
        acc[groupIndex] = [];
      }

      acc[groupIndex].push(curr);

      return acc;
    }, []);

    const averagedData = groupedData.map((group, index) => {
      const averageGoal =
        group.reduce((acc, curr) => acc + curr.goal, 0) / group.length;

      return {
        goal: averageGoal,
        index: index,
      };
    });
    console.log(averagedData);
    data = averagedData;
  } else {
    throw new Error("Failed to fetch data");
  }
  return (
    <ChartsServer
      data={data}
      wider
      text="Complex"
      description="Average of 1000 values from an API"
    />
  );
}
