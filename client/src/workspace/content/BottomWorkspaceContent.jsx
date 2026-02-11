import BottomWorkspaceShell from '../BottomWorkspaceShell';
import KrakenScannerUI from '../../layouts/kraken/KrakenScannerUI';

export default function BottomWorkspaceContent({ children }) {
  return (
    <BottomWorkspaceShell>
        <KrakenScannerUI />
    </BottomWorkspaceShell>
  );
}
