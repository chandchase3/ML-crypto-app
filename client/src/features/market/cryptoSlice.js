import { createSlice } from '@reduxjs/toolkit';
import krakenPairs from '../kraken/pairs.json';

const usdPrefix = ['USD', 'USDT', 'USDC'];
const usdCoins = krakenPairs.filter(p => usdPrefix.includes(p.quote));

const historyQty = 50;

const initialState = {
  krakenCoins: usdCoins,
  history: {},
  krakenGainers: [],
  reqSpeed: 2000,
  gainersQty: 10,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setHistory: (state, action) => {
      const { reqCoin, resCoin } = action.payload;
      if (!state.history[reqCoin]) state.history[reqCoin] = [];

      state.history[reqCoin].push({
        coin: resCoin,
        updatedAt: Date.now(),
      });

      if (state.history[reqCoin].length > historyQty) {
        state.history[reqCoin].shift();
      }
    },

    calcGainers: (state, action) => {
      const { cache, gainersQty } = action.payload;

      const gainers = Object.keys(cache).map(pair => ({
        pair,
        coin: cache[pair],
      }));

      gainers.sort(
        (a, b) =>
          parseFloat(b.coin.p?.[1] ?? 0) -
          parseFloat(a.coin.p?.[1] ?? 0)
      );

      state.krakenGainers = gainers.slice(0, gainersQty);
    },

    setReqSpeed: (state, action) => {
      state.reqSpeed = action.payload;
    },

    setGainersQty: (state, action) => {
      state.gainersQty = action.payload;
    },
  },
});

export const {
  setHistory,
  calcGainers,
  setReqSpeed,
  setGainersQty,
} = cryptoSlice.actions;

export const getKrakenAll = state => state.crypto.krakenCoins;
export const getHistory = state => state.crypto.history;
export const getGainers = state => state.crypto.krakenGainers;
export const getReqSpeed = state => state.crypto.reqSpeed;
export const getGainersQty = state => state.crypto.gainersQty;

export default cryptoSlice.reducer;
