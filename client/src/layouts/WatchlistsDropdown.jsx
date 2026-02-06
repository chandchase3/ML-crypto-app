// src/components/SideNav/WatchlistsDropdown.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWatchlists, setActiveWatchlist } from '../features/watchlists/watchlistsSlice';
import { ChevronRight, ChevronDown } from 'lucide-react';
import styles from './WatchlistsDropdown.module.css';

export const WatchlistsDropdown = () => {
  const dispatch = useDispatch();
  const watchlists = useSelector(getWatchlists);
  const [openId, setOpenId] = useState(null); // which watchlist dropdown is open

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id); // open/close dropdown
    dispatch(setActiveWatchlist(id)); // set active watchlist in Redux
  };

  return (
    <ul className={styles.dropdownList}>
      {watchlists.map((wl) => (
        <div key={wl.id} className={styles.dropdownItem}>
          <button
            className={styles.dropdownToggle}
            onClick={() => toggleDropdown(wl.id)}
          >
            {wl.name}
            {openId === wl.id ? (
              <ChevronDown size={16} className={styles.chevron} />
            ) : (
              <ChevronRight size={16} className={styles.chevron} />
            )}
          </button>

          {openId === wl.id && (
            <ul className={styles.dropdownContent}>
              {wl.symbols.length > 0 ? (
                wl.symbols.map((sym) => <li className={styles.dropListItem} key={sym}>{sym}</li>)
              ) : (
                <li className={styles.dropListItem}>No symbols yet</li>
              )}
            </ul>
          )}
        </div>
      ))}
    </ul>
  );
};
