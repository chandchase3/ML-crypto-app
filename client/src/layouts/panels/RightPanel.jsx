import { useDispatch, useSelector } from 'react-redux';
import { setRightPanelWidth } from '../redux/workspaceSlice';
import styles from './RightPanel.module.css';

export default function RightPanel() {
  const dispatch = useDispatch();
  const width = useSelector((state) => state.workspace.rightPanel.width);

  const startResize = (e) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (eMove) => {
      const delta = startX - eMove.clientX; // drag left
      const newWidth = Math.max(48, startWidth + delta);
      dispatch(setRightPanelWidth(newWidth));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Pretend nav items
  const navItems = [
    "Dashboard",
    "Recent Alerts",
    "Market Summary",
    "Filters / Tags",
    "Settings"
  ];

  return (
    <aside className={styles.panel} style={{ width }}>
      <div className={styles.resizeHandle} onMouseDown={startResize} />
      
      <nav className={styles.navLinks}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
