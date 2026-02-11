import PanelShell from './PanelShell';

export default function LeftPanel() {
  return (
    <PanelShell panel="leftPanel" direction="left">
      <div style={{ padding: 16 }}>
        Left Panel
      </div>
    </PanelShell>
  );
}
