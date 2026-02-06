// src/components/panels/PanelToggleButton.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './PanelToggleButton.module.css'; // can reuse styles or scope your own

export const PanelToggleButton = ({ collapsed, onToggle, icon: Icon = ChevronRight, ariaLabel = "Toggle panel" }) => {
  return (
    <button
      className={`${styles.toggleBtn} ${collapsed ? styles.toggleCollapsed : ''}`}
      onClick={onToggle}
      aria-label={ariaLabel}
    >
      <Icon size={24} className={`${styles.reversedIcon} ${collapsed ? '' : styles.open}`} />
    </button>
  );
};

export default PanelToggleButton;
