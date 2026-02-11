import React, { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectScannerByName, updateItemInScanner } from "../../features/scanner/scannerSlice";

const KRAKEN_WS_URL = "wss://ws.kraken.com";

// Minimal base overrides — only map Kraken-specific names
const BASE_OVERRIDES = { BTC: "XBT", DOGE: "XDG" };
const USD_QUOTES = ["USD", "USDT", "USDC"];

const KrakenScanner = ({ scannerName = "topAltcoins" }) => {
  const dispatch = useDispatch();
  const scanner = useSelector((state) => selectScannerByName(state, scannerName));
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const symbolMapRef = useRef(new Map());

  // Get raw symbols from Redux
  const scannerList = useMemo(() => scanner?.items.map((i) => i.symbol) ?? [], [scanner]);
  const scannerKey = useMemo(() => scannerList.join(","), [scannerList]);

  // Initialize WS
  const initWebSocket = () => {
    if (!scannerList.length) return;

    // Close existing connection if any
    wsRef.current?.close();

    const ws = new WebSocket(KRAKEN_WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Kraken WS connected");

      // Map symbols to Kraken WS names (BTC → XBT, DOGE → XDG, others pass through)
      const krakenPairs = scannerList
        .map((s) => {
          const [base, quote] = s.split("/");
          if (!USD_QUOTES.includes(quote)) return null;

          const normalizedBase = BASE_OVERRIDES[base] || base;
          const krakenPair = `${normalizedBase}/${quote}`;
          // Create reverse mapping from Kraken pair to original symbol
          symbolMapRef.current.set(krakenPair, s);
          return krakenPair;
        })
        .filter(Boolean);

      if (!krakenPairs.length) {
        console.warn("No valid Kraken pairs to subscribe");
        return;
      }

      console.log("Subscribing to Kraken pairs:", krakenPairs);
      try {
        ws.send(
          JSON.stringify({
            event: "subscribe",
            pair: krakenPairs,
            subscription: { name: "ticker" },
          })
        );
      } catch (err) {
        console.error("Failed to send subscription:", err);
      }
    };

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);

        if (Array.isArray(data) && data.length >= 4) {
          const krakenPair = data[3]; // WS pair name like XBT/USD
          const ticker = data[1];

          // Get original symbol from map
          const originalSymbol = symbolMapRef.current.get(krakenPair);
          if (!originalSymbol || !ticker) return;

          dispatch(
            updateItemInScanner({
              scannerName,
              symbol: originalSymbol,
              updates: { data: ticker },
            })
          );
        }
      } catch (err) {
        console.error("Failed to process message:", err);
      }
    };

    ws.onerror = (err) => console.error("Kraken WS error:", err);

    ws.onclose = (e) => {
      wsRef.current = null;
      console.warn("Kraken WS closed", e.wasClean ? "cleanly" : "unexpectedly");
      // Auto-reconnect after 1s
      reconnectTimeoutRef.current = setTimeout(initWebSocket, 1000);
    };
  };

  // Run once, re-run if scannerList changes
  useEffect(() => {
    initWebSocket();
    return () => {
      wsRef.current?.close();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      symbolMapRef.current.clear();
    };
  }, [scannerKey, dispatch]);

  return null; // no UI
};

export default KrakenScanner;
