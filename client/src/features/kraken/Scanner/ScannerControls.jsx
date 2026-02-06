import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getActiveWatchlistSymbols,
  removeAssetFromActiveWatchlist,
} from '../../watchlists/watchlistsSlice';
import ScannerCoin from './ScannerCoin';
import ScannerAdd from './ScannerAdd';
import styles from './ScannerControls.module.css';

const ScannerControls = () => {
  const dispatch = useDispatch();
  const assets = useSelector(getActiveWatchlistSymbols);

  const handleRemove = (pair) => {
    dispatch(removeAssetFromActiveWatchlist(pair));
  };

  return (
    <div className={styles.addScannerContainer}>
      <ScannerAdd />

      {/* {assets.map((pair) => (
        <ScannerCoin
          key={pair}
          item={pair}
          onRemove={() => handleRemove(pair)}
        />
      ))} */}
    </div>
  );
};

export default ScannerControls;
