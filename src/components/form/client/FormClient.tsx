import { RootState } from "@/state/store";
import { useAppSelector } from "@/state/hooks";
import FormClientSimple from "./FormClientSimple";
import FormClientAverage from "./FormClientAverage";
import FormClientComplex from "./FormClientComplex";

export default function FormClient() {
  const { complexity } = useAppSelector((state: RootState) => state.render);
  return (
    <div className="relative z-50 flex  flex-grow  flex-col gap-y-4 overflow-y-auto rounded-lg px-4 py-8">
      <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-left text-6xl font-bold text-transparent">
        Client Side Form
      </h1>
      {complexity === "simple" ? (
        <FormClientSimple />
      ) : complexity === "average" ? (
        <FormClientAverage />
      ) : (
        <FormClientComplex />
      )}
    </div>
  );
}
