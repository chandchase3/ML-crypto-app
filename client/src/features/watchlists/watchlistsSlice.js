import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';

/* =======================
   INITIAL STATE
======================= */
const initialState = {
  byId: {
    test_watchlist_1: {
      id: 'test_watchlist_1',
      name: 'Kraken Core Watchlist',
      exchange: 'kraken',
      symbols: ['BTC/USD', 'ETH/USD', 'SOL/USD', 'ADA/USD', 'LTC/USD', 'LINK/USD', 'BCH/USD', 'AVAX/USD','XLM/USD', 'XTZ/USD','ALGO/USD'],
      createdAt: Date.now(),
    },
  },
  allIds: ['test_watchlist_1'],
  activeWatchlistId: 'test_watchlist_1',
};

/* =======================
   SLICE
======================= */
const watchlistsSlice = createSlice({
  name: 'watchlists',
  initialState,

  reducers: {
    /* =======================
       ACTIVE WATCHLIST
    ======================= */
    setActiveWatchlist(state, action) {
      state.activeWatchlistId = action.payload;
    },

    /* =======================
       CREATE WATCHLIST
    ======================= */
    createWatchlist: {
      reducer(state, action) {
        const watchlist = action.payload;

        state.byId[watchlist.id] = watchlist;
        state.allIds.push(watchlist.id);
        state.activeWatchlistId = watchlist.id;
      },

      prepare({ name, exchange = 'kraken' }) {
        const id = nanoid();

        return {
          payload: {
            id,
            name,
            exchange,
            symbols: [],
            createdAt: Date.now(),
          },
        };
      },
    },

    /* =======================
       DELETE WATCHLIST
    ======================= */
    deleteWatchlist(state, action) {
      const id = action.payload;

      delete state.byId[id];
      state.allIds = state.allIds.filter((wid) => wid !== id);

      if (state.activeWatchlistId === id) {
        state.activeWatchlistId = state.allIds[0] || null;
      }
    },

    /* =======================
       RENAME WATCHLIST
    ======================= */
    renameWatchlist(state, action) {
      const { id, name } = action.payload;

      if (state.byId[id]) {
        state.byId[id].name = name;
      }
    },

    /* =======================
       ASSET MUTATIONS
    ======================= */
    addAssetToActiveWatchlist(state, action) {
      const pair = action.payload;
      const activeId = state.activeWatchlistId;
      const list = state.byId[activeId];

      if (!list.symbols.includes(pair)) {
        list.symbols.push(pair);
      }
    },

    removeAssetFromActiveWatchlist(state, action) {
      const pair = action.payload;
      const activeId = state.activeWatchlistId;
      const list = state.byId[activeId];

      list.symbols = list.symbols.filter((p) => p !== pair);
    },
  },

  
});

/* =======================
   EXPORT ACTIONS
======================= */
export const {
  setActiveWatchlist,
  createWatchlist,
  deleteWatchlist,
  renameWatchlist,
  addAssetToActiveWatchlist,
  removeAssetFromActiveWatchlist,
} = watchlistsSlice.actions;

/* =======================
   SELECTORS
======================= */

export const getWatchlists = (state) =>
  state.watchlists.allIds.map((id) => state.watchlists.byId[id]);

export const getActiveWatchlist = (state) =>
  state.watchlists.byId[state.watchlists.activeWatchlistId];

export const getActiveWatchlistId = (state) =>
  state.watchlists.activeWatchlistId;

export const getActiveWatchlistSymbols = createSelector(
  [getActiveWatchlist],
  (watchlist) => watchlist?.symbols ?? []
);

/* =======================
   KRAKEN SCANNER SELECTOR
======================= */

const USD_QUOTES = ['USD', 'USDT', 'USDC'];
const KRAKEN_BASE_MAP = { BTC: 'XBT' };

export const getKrakenScannerList = createSelector(
  [getActiveWatchlistSymbols],
  (symbols) =>
    symbols
      .map((symbol) => {
        const [base, quote] = symbol.split('/');

        if (!USD_QUOTES.includes(quote)) return null;

        return `${KRAKEN_BASE_MAP[base] || base}/${quote}`;
      })
      .filter(Boolean)
);


export default watchlistsSlice.reducer;



