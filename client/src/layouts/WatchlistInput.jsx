// src/components/SideNav/WatchlistInput.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createWatchlist } from '../features/watchlists/watchlistsSlice';
import styles from './WatchlistInput.module.css';

const WatchlistInput = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      dispatch(createWatchlist({ name: value.trim() }));
      setValue('');
    }
  };

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Create watchlist..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default WatchlistInput;
