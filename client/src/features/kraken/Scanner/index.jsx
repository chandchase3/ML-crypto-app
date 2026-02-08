import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getActiveWatchlist } from "../../watchlists/watchlistsSlice";
import ScannerControls from "./ScannerControls";
import ScannerItem from "./ScannerItem";
import styles from "./index.module.css";

const Scanner = () => {
  const activeWatchlist = useSelector(getActiveWatchlist);
  const scannerList = activeWatchlist?.symbols ?? [];

  const [connected, setConnected] = useState(false);
  const [scanData, setPrices] = useState({});

  useEffect(() => {
    if (!scannerList.length) return;

    const ws = new WebSocket("wss://ws.kraken.com");

    ws.onopen = () => {
      setConnected(true);

      const krakenPairMap = { BTC: "XBT" };

      const krakenPairs = scannerList.map((p) => {
        const [base, quote] = p.split("/");
        return `${krakenPairMap[base] || base}/${quote}`;
      });

      ws.send(
        JSON.stringify({
          event: "subscribe",
          pair: krakenPairs,
          subscription: { name: "ticker" },
        })
      );
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (Array.isArray(data)) {
        const pair = data[3];
        setPrices((prev) => ({ ...prev, [pair]: data }));
      }
    };

    ws.onclose = () => setConnected(false);
    ws.onerror = (err) => console.error("WS error:", err);

    return () => ws.close();
  }, [scannerList]);

  return (
    <div>
      <div className={styles.controlsContainer}>
        <ScannerControls />
      </div>
      <div className={styles.scannerContainer}>
        <ScannerItem scanData={scanData} />
      </div>
    </div>
  );
};

export default Scanner;