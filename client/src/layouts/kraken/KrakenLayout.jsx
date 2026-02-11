// src/features/crypto/Kraken.jsx
import React from 'react'
import KrakenScanner from './KrakenScanner';
import KrakenScannerUI from './KrakenScannerUI';
import KrakenApiLoader from '../../providers/kraken/KrakenApiLoader';
const KrakenLayout = () => {

  return (
    <div>
      <KrakenApiLoader />
      <KrakenScanner />
      <KrakenScannerUI />
      <KrakenScannerUI />
    </div>
  );
};

export default KrakenLayout;
