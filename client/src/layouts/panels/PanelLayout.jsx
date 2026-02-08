import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';
import { adjustSectionHeight } from '../redux/workspaceSlice';
import styles from './PanelLayout.module.css';

export default function PanelLayout({ panel, children }) {
  const dispatch = useDispatch();
  const sections = useSelector(state => state.workspace[panel].sections);

  // Only visible sections (not collapsed)
  const visibleSectionKeys = Object.keys(sections).filter(id => !sections[id].collapsed);

  const startResize = (e, topId, bottomId) => {
    e.preventDefault();
    const startY = e.clientY;
    const topStart = sections[topId].height;
    const bottomStart = sections[bottomId].height;

    const onMouseMove = (eMove) => {
      const delta = eMove.clientY - startY;
      const newTopHeight = Math.max(sections[topId].minHeight, topStart + delta);
      const newBottomHeight = Math.max(sections[bottomId].minHeight, bottomStart - delta);

      dispatch(adjustSectionHeight({
        panel,
        topId,
        bottomId,
        topHeight: newTopHeight,
        bottomHeight: newBottomHeight
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
      {visibleSectionKeys.map((id, index) => {
        const section = sections[id];
        const nextId = visibleSectionKeys[index + 1]; // map to next visible section

        return (
          <Fragment key={id}>
            <div
              style={{
                height: section.height,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {children.find(c => c.props.id === id)}
            </div>

            {/* Only render handle if there is a next visible section */}
            {nextId && (
              <div
                className={styles.resizeHandle}
                onMouseDown={(e) => startResize(e, id, nextId)}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
