// src/layouts/kraken/KrakenScannerUI.jsx
import React from "react";
import { useSelector } from "react-redux";
import styles from "./KrakenScanner.module.css";
import ScannerTable from "./ScannerTable";
import AddScannerItems from "./controls/AddScannerItems";
import { selectKrakenActiveScanners  } from "../../features/scanner/scannerSlice";

const KrakenScannerUI = () => {
  const activeScanners = useSelector(selectKrakenActiveScanners );

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

export default KrakenScannerUI;
