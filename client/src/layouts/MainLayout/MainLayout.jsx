import { useSelector } from 'react-redux';
import TopNavbar from '../navbars/TopNavbar';
import BottomNavbar from '../navbars/BottomNavbar';
import SectionedPanel from '../panels/SectionedPanel';
import RightPanel from '../panels/RightPanel';
import SecondaryWorkSpace from '../workspaces/SecondaryWorkSpace';
import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
  const workspace = useSelector((state) => state.workspace);
  const { overlay, height: secondaryHeight } = workspace.secondaryPanel;

  return (
    <div className={styles.container}>
      {workspace.topNav.visible && <TopNavbar />}

      <div className={styles.body}>
        {workspace.leftPanel.visible && <SectionedPanel />}
        
        <div className={styles.mainColumn}>
          {/* Main content wrapper scrolls if secondary panel covers it */}
          <div
            className={styles.mainContentWrapper}
            style={{
              maxHeight: !overlay && workspace.secondaryPanel.visible
                ? `calc(100% - ${secondaryHeight}px)`
                : '100%',
            }}
          >
            <main className={styles.mainContent}>{children}</main>
          </div>

          {/* Inline secondary panel */}
          {!overlay && workspace.secondaryPanel.visible && <SecondaryWorkSpace />}

          {/* Overlay secondary panel */}
          {overlay && workspace.secondaryPanel.visible && <SecondaryWorkSpace />}
        </div>

        {workspace.rightPanel.visible && <RightPanel />}
      </div>

      {workspace.bottomNav.visible && <BottomNavbar />}
    </div>
  );
}
