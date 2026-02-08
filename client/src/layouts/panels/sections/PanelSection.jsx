import { useDispatch, useSelector } from 'react-redux';
import { toggleSectionCollapse, toggleSectionMaximize } from '../../redux/workspaceSlice';
import styles from './PanelSection.module.css';

export default function PanelSection({ panel, id, title, children }) {
  const dispatch = useDispatch();
  const section = useSelector(state => state.workspace[panel].sections[id]);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span>{title}</span>
        <div className={styles.buttons}>
          <button onClick={() => dispatch(toggleSectionCollapse({ panel, id }))}>
            {section.collapsed ? '+' : '−'}
          </button>
          <button onClick={() => dispatch(toggleSectionMaximize({ panel, id }))}>
            [ ]{/* simple maximize icon */}
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
