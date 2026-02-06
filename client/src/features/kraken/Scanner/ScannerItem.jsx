import React from "react";
import Decimal from "decimal.js";
import styles from "./ScannerItem.module.css";

const ScannerItem = ({ scanData }) => {
  if (!scanData || Object.keys(scanData).length === 0) {
    return <p className={styles.noData}>No data yet</p>;
  }

  return (
    <div>
      {/* Column headers */}
      <div className={styles.header}>
        <div className={styles.col}>Coin</div>
        <div className={styles.col}>Price</div>
        <div className={styles.col}>Volume 24h</div>
        <div className={styles.col}>Change %</div>
      </div>

      <ul className={styles.list}>
        {Object.entries(scanData).map(([pair, tickerData], index) => {
          if (!Array.isArray(tickerData) || !tickerData[1]?.c) return null;

          const coinData = tickerData[1];
          const price = new Decimal(coinData.c[0]).toFixed(2);
          const vol24 = new Decimal(coinData.v[1]).toFixed(2);
          const change24 = coinData.o[1]
            ? new Decimal(
                ((coinData.c[0] - coinData.o[1]) / coinData.o[1]) * 100
              ).toFixed(2)
            : "0.00";

          const isPositive = parseFloat(change24) >= 0;

          return (
            <li
              key={pair}
              className={`${styles.item} ${
                index % 2 === 0 ? styles.even : styles.odd
              }`}
            >
              <div className={styles.col}>{pair}</div>
              <div className={styles.col}>${price}</div>
              <div className={styles.col}>${vol24}</div>
              <div
                className={`${styles.col} ${
                  isPositive ? styles.positive : styles.negative
                }`}
              >
                {change24}%
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScannerItem;
