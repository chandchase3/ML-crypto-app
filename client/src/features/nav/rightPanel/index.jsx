import { useDispatch, useSelector } from 'react-redux';
import { toggleRightPanelCollapse, setRightPanelWidth } from '../../ui/uiSlice';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './RightPanel.module.css';

export default function RightPanel() {
  const dispatch = useDispatch();
  const { collapsed, items, width } = useSelector((state) => state.ui.rightPanel);
  const [resizing, setResizing] = useState(false);

  const startResize = (e) => {
    e.preventDefault();
    setResizing(true);
  };

  const onMouseMove = (e) => {
    if (!resizing || collapsed) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 100) dispatch(setRightPanelWidth(newWidth));
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
  }, [resizing, collapsed]);

  return (
    <div className={styles.container}>
      {!collapsed && <div className={styles.resizer} onMouseDown={startResize} />}
      <aside
        className={`${styles.rightPanel} ${collapsed ? styles.collapsed : ''}`}
        style={{ width: collapsed ? 48 : width }}
      >
        <button
          className={`${styles.toggleBtn} ${collapsed ? styles.toggleCollapsed : ''}`}
          onClick={() => dispatch(toggleRightPanelCollapse())}
          aria-label="Toggle right panel"
        >
          <ChevronLeft
            size={24}
            className={`${styles.reversedIcon} ${collapsed ? '' : styles.open}`}
          />
        </button>

        {!collapsed && (
          <nav className={styles.navLinks}>
            <ul>
              {items.recentAlerts && <li>Recent Alerts</li>}
              {items.marketSummary && <li>Market Summary</li>}
              {items.filters && <li>Filters / Tags</li>}
            </ul>
          </nav>
        )}
      </aside>
    </div>
  );
}
