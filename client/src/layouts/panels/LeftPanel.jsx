import { useDispatch, useSelector } from 'react-redux';
import { setLeftPanelWidth } from '../redux/workspaceSlice';
import styles from './LeftPanel.module.css';

export default function LeftPanel({ children }) {
  const dispatch = useDispatch();
  const width = useSelector((state) => state.workspace.leftPanel.width);

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
      <div className={styles.content}>
        {children}
      </div>
    </aside>
  );
}
