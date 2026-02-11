import { useSelector } from 'react-redux';
import styles from '../MainLayout.module.css';

export default function TopWorkspaceShell({ children }) {
  const workspace = useSelector((state) => state.workspace);

  const {
    overlay,
    height: secondaryHeight,
    visible: secondaryVisible,
    dragHeight,
    dragging,
  } = workspace.secondaryPanel;

  const liveBottomHeight = dragging ? dragHeight : secondaryHeight;

  return (
    <div
      className={styles.mainContentWrapper}
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        paddingBottom:
          secondaryVisible && !overlay
            ? `${liveBottomHeight}px`
            : '0px',
      }}
    >
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
