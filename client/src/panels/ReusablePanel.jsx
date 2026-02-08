import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resizePanel, setPanelMode } from './ReusablePanelSlice';
import styles from './ReusablePanel.module.css';

export default function ReusablePanel({ panel = 'leftPanel', children }) {
  const dispatch = useDispatch();
  const panelState = useSelector((state) => state.reusablePanel[panel]);
  const panelRef = useRef(null);
  const [resizing, setResizing] = useState(false);

  const startResize = () => setResizing(true);

  const onMouseMove = (e) => {
    if (!resizing) return;

    let newSize;
    if (panel === 'leftPanel') newSize = e.clientX;
    if (panel === 'rightPanel') newSize = window.innerWidth - e.clientX;
    if (panel === 'bottomPanel') newSize = window.innerHeight - e.clientY;

    dispatch(resizePanel({ panel, size: newSize }));
  };

  const stopResize = () => setResizing(false);

  useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', stopResize);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopResize);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [resizing]);

  const getPanelClass = () => {
    switch (panelState.mode) {
      case 'open':
        return styles.open;
      case 'collapsed':
        return styles.collapsed;
      case 'over':
        return styles.over;
      case 'overTransparent':
        return styles.overTransparent;
      case 'hidden':
        return styles.hidden;
      default:
        return '';
    }
  };

  const style =
    panel === 'bottomPanel'
      ? { height: panelState.height }
      : { width: panelState.width, height: '100%' }; // ensure full height

  return (
    <div ref={panelRef} className={`${styles.panel} ${getPanelClass()}`} style={style}>
      <div className={styles.resizer} onMouseDown={startResize} />
      {children}
    </div>
  );
}
