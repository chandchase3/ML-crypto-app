import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideNavCollapse } from '../../features/ui/uiSlice';
import styles from './WatchlistPanel.module.css';
import { PanelToggleButton } from '../panelToggleButton';
import { LeftWatchlist } from '../LeftWatchlist';

export const WatchlistPanel = () => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => state.ui.sideNav);

  return (
    <aside className={`${styles.sideNav} ${collapsed ? styles.collapsed : ''}`}>
      <PanelToggleButton
        collapsed={collapsed}
        onToggle={() => dispatch(toggleSideNavCollapse())}
        ariaLabel="Toggle watchlist side panel"
      />
      {!collapsed && <LeftWatchlist />}
    </aside>
  );
};

export default WatchlistPanel;