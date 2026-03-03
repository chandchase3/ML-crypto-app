// src/providers/kraken/KrakenStreamManager.jsx
import { useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  updateItemInScanner,
  selectKrakenActiveScanners,
} from "../../features/scanner/scannerSlice";

// Same normalization function as in slice
const symbolMap = { BTC: "XBT", DOGE: "XDG" };
const normalizeSymbol = (symbol) =>
  symbol.replace(/^(BTC|DOGE)/, (match) => symbolMap[match]);

const KrakenStreamManager = () => {
  const dispatch = useDispatch();
  const store = useStore();

  const socketRef = useRef(null);
  const subscribedPairsRef = useRef(new Set());

  // Select active scanners
  const activeScanners = useSelector(selectKrakenActiveScanners);

  // Compute unique pairs for subscription
  const uniquePairs = useMemo(() => {
    const pairs = activeScanners.flatMap((scanner) =>
      scanner.items.map((item) => item.symbol)
    );
    return [...new Set(pairs)];
  }, [activeScanners]);

  // Open socket only once
  useEffect(() => {
    socketRef.current = new WebSocket("wss://ws.kraken.com/");

    socketRef.current.onopen = () => {
      console.log("Kraken WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (!Array.isArray(message)) return;

      const [, tickerData, , pair] = message;
      if (!tickerData || !pair) return;

      // Normalize Kraken pair for slice
      const normalizedPair = normalizeSymbol(pair);

      // Pull fresh state directly from store
      const currentScanners = selectKrakenActiveScanners(store.getState());

      currentScanners.forEach((scanner) => {
        const itemExists = scanner.items.some(
          (item) => item.symbol === normalizedPair
        );

        if (!itemExists) return;

        dispatch(
          updateItemInScanner({
            scannerName: scanner.name,
            symbol: normalizedPair,
            updates: { data: tickerData },
          })
        );
      });
    };

    return () => {
      socketRef.current?.close();
    };
  }, [dispatch, store]);

  // Handle dynamic subscription changes
  useEffect(() => {
    if (!socketRef.current || socketRef.current.readyState !== 1) return;

    const currentSubs = subscribedPairsRef.current;

    const toSubscribe = uniquePairs.filter((p) => !currentSubs.has(p));
    const toUnsubscribe = [...currentSubs].filter(
      (p) => !uniquePairs.includes(p)
    );

    if (toSubscribe.length > 0) {
      socketRef.current.send(
        JSON.stringify({
          event: "subscribe",
          pair: toSubscribe,
          subscription: { name: "ticker" },
        })
      );
      toSubscribe.forEach((p) => currentSubs.add(p));
    }

    if (toUnsubscribe.length > 0) {
      socketRef.current.send(
        JSON.stringify({
          event: "unsubscribe",
          pair: toUnsubscribe,
          subscription: { name: "ticker" },
        })
      );
      toUnsubscribe.forEach((p) => currentSubs.delete(p));
    }
  }, [uniquePairs]);

  return null;
};

export default KrakenStreamManager;
