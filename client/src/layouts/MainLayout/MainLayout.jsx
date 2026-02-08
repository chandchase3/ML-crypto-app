import { useSelector } from 'react-redux';
import TopNavbar from '../../features/nav/topNavbar';
import RightPanel from '../../features/nav/rightPanel';
import LeftPanelTest from '../../layouts/PanelLayouts/LeftPanelTest';
import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
  const { topNav, sideNav, rightPanel } = useSelector((state) => state.ui);

  return (
    <div className={styles.container}>
      {topNav.visible && <TopNavbar />}

      <div className={styles.body}>
        {sideNav.visible && <LeftPanelTest />}
        <main className={styles.mainContent}>{children}</main>
        {rightPanel.visible && <RightPanel />}
        {/* {rightPanel.visible && <RightPanel />} */}
      </div>
    </div>
  );
}
