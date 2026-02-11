// src/layouts/kraken/ScannerTable.jsx
import React from "react";
import styles from "./ScannerTable.module.css";
import ScannerRow from "./ScannerRow";

const ScannerTable = ({ columns, items }) => {
  if (!items || items.length === 0) return <p className={styles.noData}>No data yet</p>;

  return (
    <div>
      {/* Column headers */}
      <div className={styles.header}>
        {columns.map((col) => (
          <div key={col.key} className={styles.col}>
            {col.label}
          </div>
        ))}
      </div>

      <ul className={styles.row}>
        {items.map((item, index) => (
          <ScannerRow
            key={item.symbol}
            item={item}
            index={index}
            columns={columns}
          />
        ))}
      </ul>
    </div>
  );
};

export default ScannerTable;
