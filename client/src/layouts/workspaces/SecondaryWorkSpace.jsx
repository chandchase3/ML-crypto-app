import { useDispatch, useSelector } from 'react-redux';
import { setSecondaryHeight } from '../redux/workspaceSlice';
import styles from './SecondaryWorkSpace.module.css';

export default function SecondaryWorkSpace() {
  const dispatch = useDispatch();
  const { height, overlay } = useSelector((state) => state.workspace.secondaryPanel);

  const startResize = (e) => {
    const startY = e.clientY;
    const startHeight = height;

    const onMouseMove = (eMove) => {
      const delta = startY - eMove.clientY; // drag up
      const newHeight = Math.max(15, startHeight + delta);
      dispatch(setSecondaryHeight(newHeight));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className={`${styles.secondaryPanel} ${overlay ? styles.overlay : styles.inline}`}
      style={{ height }}
    >
      <div className={styles.resizeHandle} onMouseDown={startResize} />
      {/* panel content */}
    </div>
  );
}
