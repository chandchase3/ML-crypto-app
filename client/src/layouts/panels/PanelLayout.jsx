import { useDispatch, useSelector } from 'react-redux';
import { adjustSectionGrow } from '../redux/workspaceSlice';
import styles from './PanelLayout.module.css';

export default function PanelLayout({ panel, children }) {
  const dispatch = useDispatch();
  const sections = useSelector(state => state.workspace[panel].sections);

  const sectionKeys = Object.keys(sections);

  const startResize = (e, topId, bottomId) => {
    e.preventDefault();
    const startY = e.clientY;
    const topGrow = sections[topId].grow;
    const bottomGrow = sections[bottomId].grow;

    const onMouseMove = (eMove) => {
      const delta = eMove.clientY - startY;
      dispatch(adjustSectionGrow({
        panel,
        topId,
        bottomId,
        delta: delta / 10 // scale to flex grow
      }));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className={styles.layout}>
      {sectionKeys.map((id, index) => {
        const section = sections[id];
        const nextId = sectionKeys[index + 1];

        return (
          <div key={id} style={{ flexGrow: section.grow, display: section.collapsed ? 'none' : 'flex', flexDirection: 'column', minHeight: 0 }}>
            {children.find(c => c.props.id === id)}
            {nextId && (
              <div
                className={styles.resizeHandle}
                onMouseDown={(e) => startResize(e, id, nextId)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
