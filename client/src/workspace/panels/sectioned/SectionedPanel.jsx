import { useDispatch, useSelector } from 'react-redux';
import PanelLayout from './PanelLayout';
import PanelSection from './PanelSection';
import { setLeftPanelWidth, setRightPanelWidth } from '../../workspaceSlice';
import styles from './SectionedPanel.module.css';

export default function SectionedPanel({ panel = 'leftPanel', direction = 'left' }) {
  const dispatch = useDispatch();
  const { width, sections, overlay, visible, transparent } = useSelector(
    state => state.workspace[panel]
  );

  if (!visible) return null;

  // Horizontal panel resize
  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (eMove) => {
      const delta = direction === 'left'
        ? eMove.clientX - startX
        : startX - eMove.clientX;

      const newWidth = Math.max(48, startWidth + delta);

      if (panel === 'leftPanel') dispatch(setLeftPanelWidth(newWidth));
      else if (panel === 'rightPanel') dispatch(setRightPanelWidth(newWidth));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Dynamic inline styles for right vs left
  const panelStyle = {
    width,
    backgroundColor: transparent ? 'rgba(3,3,3,0.72)' : '#1e1e1e'
  };

  return (
    <aside
      className={`${styles.panel} ${overlay ? styles.overlay : ''} ${direction === 'right' ? styles.right : ''}`}
      style={panelStyle}
    >
      {/* Horizontal resize handle */}
      <div
        className={styles.resizeHandle}
        onMouseDown={startResize}
        style={direction === 'right' ? { left: 0, right: 'auto' } : {}}
      />

      {/* Sections */}
      <PanelLayout panel={panel}>
        {Object.keys(sections).map(id => (
          <PanelSection key={id} panel={panel} id={id} title={id}>
            {id} Content
          </PanelSection>
        ))}
      </PanelLayout>
    </aside>
  );
}
