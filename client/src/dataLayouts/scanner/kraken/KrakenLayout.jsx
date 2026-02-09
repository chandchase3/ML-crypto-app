// src/features/crypto/Kraken.jsx
import React from 'react'
import KrakenScanner from './KrakenScanner'; // renamed version
import { useSelector } from 'react-redux';
import { getKrakenScannerList } from '../../../features/watchlists/watchlistsSlice'; // selector for custom list
const KrakenLayout = () => {
  const krakenScannerList = useSelector(getKrakenScannerList);

  return (
    <div>
      <KrakenScanner krakenCoins={krakenScannerList} />
    </div>
  );
};

export default KrakenLayout;
