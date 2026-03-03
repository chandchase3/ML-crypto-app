import TopWorkspaceShell from '../shells/TopWorkspaceShell';
import ScannerUI from '../../view/scanner/ScannerUI';
import KrakenStreamManager from '../../providers/kraken/KrakenStreamManager';

export default function TopWorkspaceContent({ children }) {
  return (
    <TopWorkspaceShell>
      <KrakenStreamManager />
      <ScannerUI scannerName="topAltcoins" />
    </TopWorkspaceShell>
  );
}
