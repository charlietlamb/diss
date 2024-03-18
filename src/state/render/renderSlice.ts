import { createSlice } from "@reduxjs/toolkit";

export type RenderMode = "client" | "server" | "hybrid";
export type Complexity = "simple" | "average" | "complex";

export interface RenderState {
  mode: RenderMode;
  complexity: Complexity;
}

const initialState: RenderState = {
  mode: "client",
  complexity: "simple",
};

const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setComplexity: (state, action) => {
      state.complexity = action.payload;
    },
  },
});

export const { setMode, setComplexity } = renderSlice.actions;

export default renderSlice.reducer;
