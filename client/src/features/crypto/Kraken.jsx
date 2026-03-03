// src/features/crypto/Kraken.jsx
import React from "react";
import ScannerUI from "../../view/scanner/ScannerUI";

const Kraken = () => {
  return (
    <div>
      <ScannerUI scannerName="topAltcoins" />
      <ScannerUI scannerName="topFiveCrypto" />
    </div>
  );
};

export default Kraken;
