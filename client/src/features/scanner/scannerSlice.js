import { createSlice, nanoid } from "@reduxjs/toolkit";

/* =======================
   UTILITY: SYMBOL MAPPER
======================= */
const symbolMap = {
  BTC: "XBT",
  DOGE: "XDG",
};

const normalizeSymbol = (symbol) => {
  return symbol.replace(/^(BTC|DOGE)/, (match) => symbolMap[match]);
};

/* =======================
   DEFAULTS
======================= */
const defaultColumns = [
  { key: "pair", label: "Pair" },
  { key: "price", label: "Price" },
  { key: "volume", label: "24h Volume" },
  { key: "change24", label: "Change %" },
];

/* =======================
   PRESET SCANNERS
======================= */
const presetTopAltcoins = {
  name: "topAltcoins",
  columns: defaultColumns,
  items: [
    "BTC/USD",
    "LTC/USD",
    "ETH/USD",
    "BNB/USD",
    "SOL/USD",
    "DOGE/USD",
    "ADA/USD",
    "LINK/USD",
    "TRX/USD",
    "ALGO/USD",
  ].map((symbol) => ({
    symbol: normalizeSymbol(symbol),
    provider: "kraken",
    data: null,
    meta: {},
  })),
  status: {
    isActive: true,
    isOpen: true,
  },
  meta: {
    preset: true,
    createdAt: Date.now(),
  },
};

/* =======================
   INITIAL STATE
======================= */
const initialState = {
  krakenScanners: {
    presetScanners: {
      topAltcoins: presetTopAltcoins,
    },
    userScanners: {},
    activeScanners: ["topAltcoins"],
    connection: {
      isConnected: false,
    },
  },
};

/* =======================
   SLICE
======================= */
const scannerSlice = createSlice({
  name: "scanner",
  initialState,
  reducers: {
    setConnected(state, action) {
      state.krakenScanners.connection.isConnected = action.payload;
    },

    addUserScanner: {
      reducer(state, action) {
        const scanner = action.payload;
        state.krakenScanners.userScanners[scanner.name] = scanner;
        state.krakenScanners.activeScanners.push(scanner.name);
      },
      prepare({ name, columns = defaultColumns }) {
        return {
          payload: {
            name,
            columns,
            items: [],
            status: { isActive: true, isOpen: true },
            meta: { createdAt: Date.now(), id: nanoid() },
          },
        };
      },
    },

    addItemToScanner(state, action) {
      const { scannerName, item } = action.payload;
      const scanner =
        state.krakenScanners.userScanners[scannerName] ||
        state.krakenScanners.presetScanners[scannerName];

      if (!scanner) return;

      // Normalize symbol automatically
      const normalizedItem = { ...item, symbol: normalizeSymbol(item.symbol) };

      if (!scanner.items.find((i) => i.symbol === normalizedItem.symbol)) {
        scanner.items.push(normalizedItem);
      }
    },

    updateItemInScanner(state, action) {
      const { scannerName, symbol, updates } = action.payload;
      const scanner =
        state.krakenScanners.userScanners[scannerName] ||
        state.krakenScanners.presetScanners[scannerName];

      if (!scanner) return;

      const normalizedSymbol = normalizeSymbol(symbol);
      const item = scanner.items.find((i) => i.symbol === normalizedSymbol);
      if (item) Object.assign(item, updates);
    },

    updateScannerStatus(state, action) {
      const { scannerName, status } = action.payload;
      const scanner =
        state.krakenScanners.userScanners[scannerName] ||
        state.krakenScanners.presetScanners[scannerName];

      if (scanner) {
        scanner.status = { ...scanner.status, ...status };
      }
    },
  },
});

/* =======================
   ACTION EXPORTS
======================= */
export const {
  setConnected,
  addUserScanner,
  addItemToScanner,
  updateItemInScanner,
  updateScannerStatus,
} = scannerSlice.actions;

/* =======================
   SELECTORS
======================= */
export const selectKrakenActiveScanners = (state) => {
  const { presetScanners, userScanners, activeScanners } =
    state.scanner.krakenScanners;

  return activeScanners
    .map((name) => presetScanners[name] || userScanners[name])
    .filter(Boolean);
};

export const selectScannerByName = (state, scannerName) => {
  const { presetScanners, userScanners } = state.scanner.krakenScanners;
  return presetScanners[scannerName] || userScanners[scannerName] || null;
};

export const selectKrakenConnection = (state) =>
  state.scanner.krakenScanners.connection.isConnected;

/* =======================
   REDUCER
======================= */
export default scannerSlice.reducer;
