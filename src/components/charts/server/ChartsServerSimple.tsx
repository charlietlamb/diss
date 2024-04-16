import ChartsServer from "./ChartsServer";

export default async function ChartsServerSimple() {
  const data24 = Array.from({ length: 24 }, () => ({
    goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
  }));

  const data = data24.map((item, index) => ({
    ...item,
    index,
  }));
  return (
    <ChartsServer
      data={data}
      text="Simple"
      description="24 randomly generated values"
    />
  );
}
