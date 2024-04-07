import { createSlice } from "@reduxjs/toolkit";

export interface CacheState {
  requests: string[];
  allRequests: string[];
}

const initialState: CacheState = {
  requests: [],
  allRequests: [],
};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setAllRequests: (state, action) => {
      state.allRequests = action.payload;
    },
  },
});

export const { setRequests, setAllRequests } = cacheSlice.actions;

export default cacheSlice.reducer;
