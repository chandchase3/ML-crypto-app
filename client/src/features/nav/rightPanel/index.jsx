import { useDispatch, useSelector } from 'react-redux';
import { toggleRightPanelCollapse } from '../../ui/uiSlice';
import { ChevronLeft } from 'lucide-react'; // same style as SideNav
import styles from './RightPanel.module.css';

export default function RightPanel() {
  const dispatch = useDispatch();
  const { collapsed, items } = useSelector((state) => state.ui.rightPanel);

  return (
    <aside className={`${styles.rightPanel} ${collapsed ? styles.collapsed : ''}`}>
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
          {/* {items.quickActions && <div className={styles.sectionTitle}>Quick Actions</div>} */}
          <ul>
            {items.recentAlerts && <li>Recent Alerts</li>}
            {items.marketSummary && <li>Market Summary</li>}
            {items.filters && <li>Filters / Tags</li>}
          </ul>
        </nav>
      )}
    </aside>
  );
}
