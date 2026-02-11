import { useDispatch, useSelector } from 'react-redux';
import { setSecondaryHeight } from './workspaceSlice';
import { useState } from 'react';
import styles from './BottomWorkspaceShell.module.css';
import KrakenScannerUI from '../layouts/kraken/KrakenScannerUI';

export default function SecondaryWorkSpace({ children }) {
  const dispatch = useDispatch();
  const { height, minHeight, maxHeight } = useSelector(
    (state) => state.workspace.secondaryPanel
  );

  const [dragHeight, setDragHeight] = useState(height);
  const [dragging, setDragging] = useState(false);

  const startResize = (e) => {
    e.preventDefault();
    setDragging(true);
    const startY = e.clientY;
    const startHeight = height;

    const onMouseMove = (eMove) => {
      const delta = startY - eMove.clientY;
      // clamp height between minHeight and maxHeight
      const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + delta));
      setDragHeight(newHeight);
    };

    const onMouseUp = (eUp) => {
      const delta = startY - eUp.clientY;
      const finalHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + delta));
      dispatch(setSecondaryHeight(finalHeight));
      setDragHeight(finalHeight);
      setDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className={styles.secondaryPanel}
      style={{
        height: dragging ? dragHeight : height,
        maxHeight: `calc(100vh - 50px)`, // ensure it never exceeds viewport
      }}
    >
      <div className={styles.resizeHandle} onMouseDown={startResize} />
      <div className={styles.panelContent}>
        {children}
      </div>
    </div>
  );
}
