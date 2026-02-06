// src/features/crypto/Kraken.jsx
import React from 'react';
import styles from './Kraken.module.css';
import KrakenDataLoop from './KrakenDataLoop';
import Scanner from './scanner'; // renamed version
import { useSelector } from 'react-redux';
import { getKrakenScannerList } from '../watchlists/watchlistsSlice'; // selector for custom list

const Kraken = () => {
  const krakenScannerList = useSelector(getKrakenScannerList);

  return (
    <div className={styles.container}>

      <Scanner krakenCoins={krakenScannerList} />
      {/* <KrakenDataLoop /> */}
    </div>
  );
};

export default Kraken;
