import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pairsJson from "../../utils/pairs.json"; // your 750 items JSON

/* =======================
   ASYNC THUNK
======================= */

// This could later fetch from Kraken REST API if needed
export const loadPairs = createAsyncThunk(
  "kraken/loadPairs",
  async () => {
    // Here we use the local JSON for now
    // Can replace with fetch("https://api.kraken.com/0/public/AssetPairs")
    const enabledPairs = pairsJson.filter((p) => p.enabled && p.source === "kraken");
    // Map base => Kraken base symbol if needed
    const KRAKEN_BASE_MAP = { BTC: "XBT" };
    const pairs = enabledPairs.map((p) => ({
      pair: p.pair,
      base: KRAKEN_BASE_MAP[p.base] || p.base,
      quote: p.quote,
    }));
    return pairs;
  }
);

/* =======================
   SLICE
======================= */

const krakenSlice = createSlice({
  name: "kraken",
  initialState: {
    pairs: [],          // all pairs with base mapping
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPairs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadPairs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pairs = action.payload;
      })
      .addCase(loadPairs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

/* =======================
   SELECTORS
======================= */

export const selectKrakenPairs = (state) => state.kraken.pairs;

export default krakenSlice.reducer;
