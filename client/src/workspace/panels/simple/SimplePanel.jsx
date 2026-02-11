import PanelShell from '../PanelShell';

export default function SimplePanel({ panel, direction = 'left', children }) {
  return (
    <PanelShell panel={panel} direction={direction}>
      {children}
    </PanelShell>
  );
}
