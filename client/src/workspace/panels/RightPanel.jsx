import SectionedPanel from './sectioned/SectionedPanel';
import { useSelector } from 'react-redux';

export default function RightPanel() {
  const workspaceRight = useSelector(state => state.workspace.rightPanel);

  if (!workspaceRight.visible) return null;

  // Reuse SectionedPanel but pass direction="right"
  return <SectionedPanel panel="rightPanel" direction="right" />;
}