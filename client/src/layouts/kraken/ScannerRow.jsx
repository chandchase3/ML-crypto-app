// src/layouts/kraken/ScannerRow.jsx
import React from "react";
import Decimal from "decimal.js";
import styles from "./ScannerRow.module.css"; // IMPORTANT: same CSS module as before

const ScannerRow = ({ item, index, columns }) => {
  const coinData = item.data;

  return (
    <li
      className={`${styles.item} ${
        index % 2 === 0 ? styles.even : styles.odd
      }`}
    >
      {columns.map((col) => {
        let value = "-";
        let numericValue = null;

        switch (col.key) {
          case "pair":
            value = item.symbol;
            break;

          case "price":
            if (coinData?.c) {
              numericValue = new Decimal(coinData.c[0]);
              value = `$${numericValue.toFixed(2)}`;
            }
            break;

          case "volume":
            if (coinData?.v) {
              numericValue = new Decimal(coinData.v[1]);
              value = `$${numericValue.toFixed(2)}`;
            }
            break;

          case "change24":
            if (coinData?.o && coinData?.c) {
              numericValue = new Decimal(
                ((coinData.c[0] - coinData.o[1]) / coinData.o[1]) * 100
              );
              value = `${numericValue.toFixed(2)}%`;
            }
            break;

          default:
            value = item[col.key] ?? "-";
        }

        const isPositive =
          col.key === "change24" && numericValue !== null
            ? numericValue.greaterThanOrEqualTo(0)
            : null;

        return (
          <div
            key={col.key}
            className={`${styles.col} ${
              isPositive === null
                ? ""
                : isPositive
                ? styles.positive
                : styles.negative
            }`}
          >
            {value}
          </div>
        );
      })}
    </li>
  );
};

export default ScannerRow;
