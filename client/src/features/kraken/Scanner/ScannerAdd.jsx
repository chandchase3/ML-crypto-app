import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveWatchlistSymbols,
  addAssetToActiveWatchlist,
} from "../../watchlists/watchlistsSlice";
import styles from "./ScannerAdd.module.css";

const ScannerAdd = () => {
  const dispatch = useDispatch();
  const assets = useSelector(getActiveWatchlistSymbols);
  const [input, setInput] = useState("");

  const normalizePair = (value) => {
    let v = value.trim().toUpperCase();
    if (!v.includes("/")) v = `${v}/USD`;
    return v;
  };

  const handleAdd = () => {
    if (!input.trim()) return;

    const pair = normalizePair(input);
    if (assets.includes(pair)) {
      setInput("");
      return;
    }

    dispatch(addAssetToActiveWatchlist(pair));
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className={styles.container}>
      <input
        value={input}
        placeholder="Scanner navbar soon..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
      <button onClick={handleAdd} className={styles.button}>
        Add
      </button>
    </div>
  );
};

export default ScannerAdd;
