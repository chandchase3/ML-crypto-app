// src/features/crypto/Kraken.jsx
import React from 'react'
import KrakenWebSockets from './KrakenWebSockets';
import ScannerUI from '../view/ScannerUI';
import KrakenApiLoader from '../../../providers/kraken/KrakenApiLoader';
const StartScanner = () => {

  return (
    <div>
      <KrakenApiLoader />
      <KrakenWebSockets />
      <ScannerUI />
    </div>
  );
};

export default StartScanner;
