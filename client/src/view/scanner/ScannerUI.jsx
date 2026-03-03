import React from "react";
import { useSelector } from "react-redux";
import { selectScannerByName } from "../../features/scanner/scannerSlice";
import ScannerTable from "./ScannerTable";
import AddScannerItems from "./controls/AddScannerItems";
import styles from "./ScannerUi.module.css";

const ScannerUI = ({ scannerName }) => {
  const scanner = useSelector((state) =>
    selectScannerByName(state, scannerName)
  );

  if (!scanner) return <p>Scanner not found</p>;
  if (!scanner.items.length) return <p>No items in scanner</p>;

  return (
    <div className={styles.scannerWrapper}>
      <div className={styles.controlsContainer}>
        <AddScannerItems scannerName={scannerName} />
      </div>

      <div className={styles.scannerContainer}>
        <ScannerTable
          columns={scanner.columns}
          items={scanner.items}
        />
      </div>
    </div>
  );
};

export default ScannerUI;
