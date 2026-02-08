import { useDispatch, useSelector } from 'react-redux';
import { setLeftPanelWidth } from '../redux/workspaceSlice';
import PanelLayout from './PanelLayout';
import PanelSection from './sections/PanelSection';
import styles from './SectionedPanel.module.css';

export default function SectionedPanel({ panel = 'leftPanel' }) {
  const dispatch = useDispatch();
  const { width, sections, overlay, visible, transparent } = useSelector(
    state => state.workspace[panel]
  );

  // Horizontal panel resize
  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (eMove) => {
      const delta = eMove.clientX - startX;
      dispatch(setLeftPanelWidth(Math.max(48, startWidth + delta)));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  if (!visible) return null;

  return (
    <aside
      className={`${styles.panel} ${overlay ? styles.overlay : ''}`}
      style={{
        width,
        backgroundColor: transparent ? 'rgba(3, 3, 3, 0.72)' : '#1e1e1e'
      }}
    >
      {/* Horizontal resize handle */}
      <div className={styles.resizeHandle} onMouseDown={startResize} />

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
