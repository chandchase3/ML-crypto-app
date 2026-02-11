import React, { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectScannerByName, updateItemInScanner } from "../scannerSlice";

const KRAKEN_WS_URL = "wss://ws.kraken.com";

// Minimal base overrides — only map Kraken-specific names
const BASE_OVERRIDES = { BTC: "XBT", DOGE: "XDG" };
const USD_QUOTES = ["USD", "USDT", "USDC"];

const KrakenWebSockets = ({ scannerName = "topAltcoins" }) => {
  const dispatch = useDispatch();
  const scanner = useSelector((state) => selectScannerByName(state, scannerName));
  const wsRef = useRef(null);

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
          return `${normalizedBase}/${quote}`;
        })
        .filter(Boolean);

      if (!krakenPairs.length) {
        console.warn("No valid Kraken pairs to subscribe");
        return;
      }

      console.log("Subscribing to Kraken pairs:", krakenPairs);
      ws.send(
        JSON.stringify({
          event: "subscribe",
          pair: krakenPairs,
          subscription: { name: "ticker" },
        })
      );

      console.log("Subscribed to Kraken pairs:", krakenPairs);
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (Array.isArray(data)) {
        const pair = data[3]; // WS pair name like XBT/USD
        const ticker = data[1];

        dispatch(
          updateItemInScanner({
            scannerName,
            symbol: pair,
            updates: { data: ticker },
          })
        );
      }
    };

    ws.onerror = (err) => console.error("Kraken WS error:", err);

    ws.onclose = (e) => {
      wsRef.current = null;
      console.warn("Kraken WS closed", e.wasClean ? "cleanly" : "unexpectedly");
      // Auto-reconnect after 1s
      setTimeout(initWebSocket, 1000);
    };
  };

  // Run once, re-run if scannerList changes
  useEffect(() => {
      console.log('KrakenScannerUI mounted');
    initWebSocket();
    return () => wsRef.current?.close();
  }, [scannerKey]);

  scannerKey
  return null; // no UI
};

export default KrakenWebSockets;
