// src/layouts/kraken/KrakenScannerUI.jsx
import React from "react";
import { useSelector } from "react-redux";
import ScannerTable from "./ScannerTable";
import AddScannerItems from "./controls/AddScannerItems";
import { selectKrakenActiveScanners  } from "../scannerSlice";
import styles from "./ScannerUi.module.css";

const ScannerUI = () => {
const activeScanners = useSelector(selectKrakenActiveScanners );
const scanners = useSelector(state => state.scanner.scanners);
console.log('scanners:', activeScanners);
  if (!activeScanners.length) return <p>No active scanners</p>;

  return (
    <div>
      {activeScanners.map((scanner) => (
        <div key={scanner.name} className={styles.scannerWrapper}>
          <div className={styles.controlsContainer}>
            <AddScannerItems scannerName={scanner.name} />
          </div>
          <div className={styles.scannerContainer}>
            <ScannerTable columns={scanner.columns} items={scanner.items} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScannerUI;
