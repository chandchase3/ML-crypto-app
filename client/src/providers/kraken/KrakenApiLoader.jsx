// src/layouts/kraken/KrakenPairsLoader.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPairs } from "../../features/kraken/krakenSlice";

const KrakenPairsLoader = () => {
  const dispatch = useDispatch();
  const pairs = useSelector((state) => state.kraken.pairs || []);

  // Load pairs on mount
  useEffect(() => {
    dispatch(loadPairs());
  }, [dispatch]);

  // Log first 5 pairs when available
  useEffect(() => {
    if (pairs.length) {
      console.log("First 5 pairs:", pairs.slice(0, 5));
    }
  }, [pairs]);

  return <div>Loaded {pairs.length} Kraken pairs</div>;
};

export default KrakenPairsLoader;
