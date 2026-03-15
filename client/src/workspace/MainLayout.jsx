import { useSelector } from 'react-redux';
import TopNav from './navbars/TopNav';
import BottomNav from './navbars/BottomNav';
import RightPanelContent from './content/RightPanelContent';
import BottomWorkspaceContent from './content/BottomWorkspaceContent';
import LeftPanelContent from './content/LeftPanelContent';
import styles from './MainLayout.module.css';
import TopWorkspaceContent from './content/TopWorkspaceContent';

export default function MainLayout({ children }) {
  const workspace = useSelector((state) => state.workspace);
  const { overlay, height: secondaryHeight, visible: secondaryVisible, dragHeight, dragging } =
    workspace.secondaryPanel; // optional: dragHeight from SecondaryWorkSpace

    // says topHeight and bottomHeight are not used, do we need it?
  const { visible: bottomVisible, height: bottomHeight } = workspace.bottomNav;

  // says liveBottomHeight is not used, do we need it?
  const liveBottomHeight = dragging ? dragHeight : secondaryHeight;

  return (
    <div className={styles.container}>
      {/* says topVisible is not used, do we need it? */}
      {/* whats weird is the top nav shows on the browser */}
      {/* {topVisible && <TopNav />} */}

      <div className={styles.body}>

        {/* I want to change this to LeftCol.jsx */}
        {workspace.leftPanel.visible && <LeftPanelContent panel="leftPanel" />}

        {/* I wwant to replace the MiddleCol.jsx (from ./content/MiddleCol.jsx*/}
        {/* IMPORTNAT NOTE FOR CHAT GPT: this top/bottom Workspace (Content  div) I want to put it into a component called SlitCol then i want MiddleCol.jsx to pass SplitCol.jsx through so that SplitCol can be used byRightPanelContent.jsx and LeftPanelContent.jsx (we are also going to change it to LeftCol.jsx and RightCol.jsx) and then we can use the split col to make the top and bottom workspace content resizable by dragging the split between them. the end result should be three columns: LeftCol, MiddleCol, RightCol.jsx, and each of those will */}

        <div className={styles.mainColumn}>
          {/* Top workspace always visible */}
          <TopWorkspaceContent />

        {/* secondary is optional, it overlays and is above top, but top can add scrolling dynamicaly basid on how tall buttom is */}
          {secondaryVisible && <BottomWorkspaceContent />}
        </div>
  
        {/* I want to change this to RightCol.jsx */}
        {workspace.rightPanel.visible && <RightPanelContent />}
      </div>

      {bottomVisible && <BottomNav />}
    </div>
  );
}
