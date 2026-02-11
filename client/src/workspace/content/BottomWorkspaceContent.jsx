import BottomWorkspaceShell from '../shells/BottomWorkspaceShell';
import StartScanner from '../../features/scanner/wsProviders/StartScanner';

export default function BottomWorkspaceContent() {
  return (
    <BottomWorkspaceShell>
        {/* <KrakenScannerUI /> */}
       <StartScanner />
    </BottomWorkspaceShell>
  );
}
