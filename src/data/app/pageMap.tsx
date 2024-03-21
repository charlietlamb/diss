import ChartsClientAverage from "@/components/charts/client/ChartsClientAverage";
import ChartsClientComplex from "@/components/charts/client/ChartsClientComplex";
import ChartsClientSimple from "@/components/charts/client/ChartsClientSimple";
import FormClientAverage from "@/components/form/client/FormClientAverage";
import FormClientComplex from "@/components/form/client/FormClientComplex";
import FormClientSimple from "@/components/form/client/FormClientSimple";
import FormHybridAverage from "@/components/form/hybrid/FormHybridAverage";
import FormHybridComplex from "@/components/form/hybrid/FormHybridComplex";
import FormHybridSimple from "@/components/form/hybrid/FormHybridSimple";
import FormServerAverage from "@/components/form/server/FormServerAverage";
import FormServerComplex from "@/components/form/server/FormServerComplex";
import FormServerSimple from "@/components/form/server/FormServerSimple";

type InnerMap = Map<string, InnerMapEnd>;
type InnerMapEnd = Map<string, React.ReactNode>;

const clientFormMap: InnerMapEnd = new Map([
  ["simple", <FormClientSimple key="simple" />],
  ["average", <FormClientAverage key="average" />],
  ["complex", <FormClientComplex key="complex" />],
]);

const serverFormMap: InnerMapEnd = new Map([
  ["simple", <FormServerSimple key="simple" />],
  ["average", <FormServerAverage key="average" />],
  ["complex", <FormServerComplex key="complex" />],
]);

const hybridFormMap: InnerMapEnd = new Map([
  ["simple", <FormHybridSimple key="simple" />],
  ["average", <FormHybridAverage key="average" />],
  ["complex", <FormHybridComplex key="complex" />],
]);

const formMap: Map<string, InnerMapEnd> = new Map([
  ["client", clientFormMap],
  ["server", serverFormMap],
  ["hybrid", hybridFormMap],
]);

const clientChartsMap: InnerMapEnd = new Map([
  ["simple", <ChartsClientSimple key="simple" />],
  ["average", <ChartsClientAverage key="average" />],
  ["complex", <ChartsClientComplex key="complex" />],
]);

const chartsMap: Map<string, InnerMapEnd> = new Map([
  ["client", clientChartsMap],
  // ["server", serverChartsMap],
  // ["hybrid", hybridChartsMap],
]);
// const dataMap: Map<string, InnerMapEnd> = new Map([
//   ["client", clientDataMap],
//   ["server", serverDataMap],
//   ["hybrid", hybridDataMap],
// ]);

export const pageMap: Map<string, InnerMap> = new Map([
  ["form", formMap],
  ["charts", chartsMap],
  // ["data", dataMap],
]);
