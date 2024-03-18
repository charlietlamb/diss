"use sever";

import ChatsServerClient from "./ChatsServerClient";

function getData() {
  const data10 = Array.from({ length: 10 }, () => ({
    goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
  }));
  const data100 = Array.from({ length: 100 }, () => ({
    goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
  }));
  const data1000 = Array.from({ length: 1000 }, () => ({
    goal: Math.floor(Math.random() * 500), // generates a random number between 0 and 499
  }));

  return [data10, data100, data1000];
}

export default function ChartsServer() {
  const start = performance.now();
  const data = getData();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 pt-16">
      <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
        Client Server
      </h1>
      <ChatsServerClient data={data} start={start} />
    </div>
  );
}
