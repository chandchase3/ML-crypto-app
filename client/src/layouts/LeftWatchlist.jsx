// src/features/watchlists/watchlistSidePanel/components/WatchlistNavContent.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { getWatchlists } from '../features/watchlists/watchlistsSlice';
import WatchlistInput from './WatchlistInput';
import { WatchlistsDropdown } from './WatchlistsDropdown';
import styles from './PanelLayouts/LeftPanelTest.module.css';

export const LeftWatchlist = () => {
  const watchlists = useSelector(getWatchlists);

  return (
    <nav className={styles.navLinks}>
      <WatchlistInput />

      <WatchlistsDropdown />
      
      {/* fallback list if needed */}
      {/* <ul>
        {watchlists.map((wl) => (
          <li key={wl.id}>{wl.name}</li>
        ))}
      </ul> */}
    </nav>
  );
};
