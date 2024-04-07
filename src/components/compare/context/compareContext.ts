import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface CompareContext {
  data1: Load[];
  setData1: Dispatch<SetStateAction<Load[]>>;
  data2: Load[];
  setData2: Dispatch<SetStateAction<Load[]>>;
  data1Cached: boolean;
  setData1Cached: Dispatch<SetStateAction<boolean>>;
  data2Cached: boolean;
  setData2Cached: Dispatch<SetStateAction<boolean>>;
  cache: boolean;
  setCache: Dispatch<SetStateAction<boolean>>;
}

export const CompareContext = createContext<CompareContext | undefined>(
  undefined,
);

export function useCompareContext() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompareContext must be used within a CompareProvider");
  }
  return context;
}
