import TopWorkspaceShell from '../TopWorkspaceShell';
import KrakenScannerUI from '../../layouts/kraken/KrakenScannerUI';

export default function BottomWorkspaceContent({ children }) {
  return (
    <TopWorkspaceShell>
        <KrakenScannerUI />
    </TopWorkspaceShell>
  );
}
