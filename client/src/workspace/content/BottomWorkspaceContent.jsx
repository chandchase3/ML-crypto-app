import BottomWorkspaceShell from '../shells/BottomWorkspaceShell';
import ScannerUI from '../../view/scanner/ScannerUI';

export default function BottomWorkspaceContent() {
  return (
    <BottomWorkspaceShell>
        {/* <KrakenScannerUI /> */}
      <ScannerUI scannerName="topFiveCrypto" />
    </BottomWorkspaceShell>
  );
}
