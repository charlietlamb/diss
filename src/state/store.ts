import { configureStore } from "@reduxjs/toolkit";
import renderSlice from "./render/renderSlice";
import cacheSlice from "./cache/cacheSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      render: renderSlice,
      cache: cacheSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
