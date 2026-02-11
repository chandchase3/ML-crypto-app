import { useSelector } from 'react-redux';
import TopNavbar from './navbars/TopNavbar';
import BottomNavbar from './navbars/BottomNavbar';
import RightPanelContent from './content/RightPanelContent';
import BottomWorkspaceContent from './content/BottomWorkspaceContent';
import LeftPanelContent from './content/LeftPanelContent';
import styles from './MainLayout.module.css';
import TopWorkspaceContent from './content/TopWorkspaceContent';

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
        {workspace.leftPanel.visible && <LeftPanelContent panel="leftPanel" />}

        <div className={styles.mainColumn}>
          {/* <TopWorkspaceShell>
            {children}
          </TopWorkspaceShell> */}
          <TopWorkspaceContent />

          {/* Bottom panel */}
          {secondaryVisible && <BottomWorkspaceContent />}
        </div>

        {workspace.rightPanel.visible && <RightPanelContent />}
      </div>

      {bottomVisible && <BottomNavbar />}
    </div>
  );
}
