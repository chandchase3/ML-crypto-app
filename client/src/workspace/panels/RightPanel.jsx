import PanelShell from './PanelShell';

export default function RightPanel() {
  return (
    <PanelShell panel="rightPanel" direction="right">
      <div style={{ padding: 16 }}>
        Right Panel
      </div>
    </PanelShell>
  );
}
