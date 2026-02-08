// src/features/crypto/Kraken.jsx
import React from 'react'
import Scanner from '../../features/kraken/Scanner'; // renamed version
import { useSelector } from 'react-redux';
import { getKrakenScannerList } from '../../features/watchlists/watchlistsSlice'; // selector for custom list
const Kraken = () => {
  const krakenScannerList = useSelector(getKrakenScannerList);

  return (
    <div>
      <Scanner krakenCoins={krakenScannerList} />
    </div>
  );
};

export default Kraken;
