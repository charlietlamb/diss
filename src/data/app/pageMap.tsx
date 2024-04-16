import ChartsClientAverage from "@/components/charts/client/ChartsClientAverage";
import ChartsClientComplex from "@/components/charts/client/ChartsClientComplex";
import ChartsClientSimple from "@/components/charts/client/ChartsClientSimple";
import ChartsServerAverage from "@/components/charts/server/ChartsServerAverage";
import ChartsServerComplex from "@/components/charts/server/ChartsServerComplex";
import ChartsServerSimple from "@/components/charts/server/ChartsServerSimple";
import DataClientAverage from "@/components/data/client/DataClientAverage";
import DataClientComplex from "@/components/data/client/DataClientComplex";
import DataClientSimple from "@/components/data/client/DataClientSimple";
import DataServerAverage from "@/components/data/server/DataServerAverage";
import DataServerComplex from "@/components/data/server/DataServerComplex";
import DataServerSimple from "@/components/data/server/DataServerSimple";
import FormClientAverage from "@/components/form/client/FormClientAverage";
import FormClientComplex from "@/components/form/client/FormClientComplex";
import FormClientSimple from "@/components/form/client/FormClientSimple";
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

const formMap: Map<string, InnerMapEnd> = new Map([
  ["client", clientFormMap],
  ["server", serverFormMap],
]);

const clientChartsMap: InnerMapEnd = new Map([
  ["simple", <ChartsClientSimple key="simple" />],
  ["average", <ChartsClientAverage key="average" />],
  ["complex", <ChartsClientComplex key="complex" />],
]);

const serverChartsMap: InnerMapEnd = new Map([
  ["simple", <ChartsServerSimple key="simple" />],
  ["average", <ChartsServerAverage key="average" />],
  ["complex", <ChartsServerComplex key="complex" />],
]);

const chartsMap: Map<string, InnerMapEnd> = new Map([
  ["client", clientChartsMap],
  ["server", serverChartsMap],
]);

const clientDataMap: InnerMapEnd = new Map([
  ["simple", <DataClientSimple key="simple" />],
  ["average", <DataClientAverage key="average" />],
  ["complex", <DataClientComplex key="complex" />],
]);

const serverDataMap: InnerMapEnd = new Map([
  ["simple", <DataServerSimple key="simple" />],
  ["average", <DataServerAverage key="average" />],
  ["complex", <DataServerComplex key="complex" />],
]);

const dataMap: Map<string, InnerMapEnd> = new Map([
  ["client", clientDataMap],
  ["server", serverDataMap],
]);

export const pageMap: Map<string, InnerMap> = new Map([
  ["form", formMap],
  ["charts", chartsMap],
  ["data", dataMap],
]);
