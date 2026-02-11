import { useSelector } from 'react-redux';
import TopNavbar from './navbars/TopNavbar';
import BottomNavbar from './navbars/BottomNavbar';
import RightPanel from './panels/RightPanel';
import BottomWorkspaceContent from './content/BottomWorkspaceContent';
import LeftPanel from './panels/LeftPanel';
import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
  const workspace = useSelector((state) => state.workspace);
  const { overlay, height: secondaryHeight, visible: secondaryVisible, dragHeight, dragging } =
    workspace.secondaryPanel; // optional: dragHeight from SecondaryWorkSpace

  const { visible: topVisible, height: topHeight } = workspace.topNav;
  const { visible: bottomVisible, height: bottomHeight } = workspace.bottomNav;

  const liveBottomHeight = dragging ? dragHeight : secondaryHeight;

  return (
    <div className={styles.container}>
      {topVisible && <TopNavbar />}

      <div className={styles.body}>
        {workspace.leftPanel.visible && <LeftPanel panel="leftPanel" />}

        <div className={styles.mainColumn}>
          <div
            className={styles.mainContentWrapper}
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              paddingBottom:
                secondaryVisible && !overlay
                  ? `${liveBottomHeight}px`
                  : '0px', // inline mode
            }}
          >
            <main className={styles.mainContent}>{children}</main>
          </div>

          {/* Bottom panel */}
          {secondaryVisible && <BottomWorkspaceContent />}
        </div>

        {workspace.rightPanel.visible && <RightPanel />}
      </div>

      {bottomVisible && <BottomNavbar />}
    </div>
  );
}
