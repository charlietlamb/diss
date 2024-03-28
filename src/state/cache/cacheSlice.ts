import { createSlice } from "@reduxjs/toolkit";

export interface CacheState {
  requests: string[];
}

const initialState: CacheState = {
  requests: [],
};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
  },
});

export const { setRequests } = cacheSlice.actions;

export default cacheSlice.reducer;
