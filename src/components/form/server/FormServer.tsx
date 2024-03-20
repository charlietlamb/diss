"use server";

import FormServerSimple from "./FormServerSimple";
import FormServerAverage from "./FormServerAverage";
import FormServerComplex from "./FormServerComplex";

export default async function FormServer({
  complexity,
}: {
  complexity: string;
}) {
  console.log(complexity);
  return (
    // <div className="relative z-50 flex  flex-grow  flex-col gap-y-4  rounded-lg px-4 py-8">
    //   <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-left text-6xl font-bold text-transparent">
    //     Server Side Form
    //   </h1>
    //   {complexity === "simple" ? (
    //     <FormServerSimple />
    //   ) : complexity === "average" ? (
    //     <FormServerAverage />
    //   ) : (
    //     <FormServerComplex />
    //   )}
    // </div>
    <FormServerSimple />
  );
}
