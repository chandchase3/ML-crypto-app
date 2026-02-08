import { useDispatch, useSelector } from 'react-redux';
import { setLeftPanelWidth } from '../redux/workspaceSlice';
import PanelLayout from './PanelLayout';
import PanelSection from './sections/PanelSection';
import styles from './LeftPanel.module.css';

export default function LeftPanel() {
  const dispatch = useDispatch();
  const width = useSelector((state) => state.workspace.leftPanel.width);
  const sections = useSelector((state) => state.workspace.leftPanel.sections);

  // Panel width resize
  const startResize = (e) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (eMove) => {
      const delta = eMove.clientX - startX;
      const newWidth = Math.max(48, startWidth + delta);
      dispatch(setLeftPanelWidth(newWidth));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <aside className={styles.panel} style={{ width }}>
      <div className={styles.resizeHandle} onMouseDown={startResize} />
      <PanelLayout panel="leftPanel">
        <PanelSection panel="leftPanel" id="watchlist" title="Watchlist">Watchlist Content</PanelSection>
        <PanelSection panel="leftPanel" id="scanner" title="Scanner">Scanner Content</PanelSection>
        <PanelSection panel="leftPanel" id="alerts" title="Alerts">Alerts Content</PanelSection>
        <PanelSection panel="leftPanel" id="settings" title="Settings">Settings Content</PanelSection>
      </PanelLayout>
    </aside>
  );
}
