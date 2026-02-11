import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToScanner, selectScannerByName } from "../../scannerSlice";
import styles from "./AddScannerItems.module.css";

const AddScannerItems = ({ scannerName }) => {
  const dispatch = useDispatch();
  const scanner = useSelector((state) => selectScannerByName(state, scannerName));
  const [input, setInput] = useState("");

  const normalizePair = (value) => {
    let v = value.trim().toUpperCase();
    if (!v.includes("/")) v = `${v}/USD`;
    return v;
  };

  const handleAdd = () => {
    if (!input.trim()) return;
    const symbol = normalizePair(input);

    if (scanner.items.find((i) => i.symbol === symbol)) {
      setInput("");
      return;
    }

    dispatch(addItemToScanner({ scannerName, item: { symbol, data: null, meta: {} } }));
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className={styles.container}>
      <input
        value={input}
        placeholder="Add symbol..."
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

export default AddScannerItems;
