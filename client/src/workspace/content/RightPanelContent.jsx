import React from "react";
import { useSelector } from "react-redux";
import PanelShell from "../shells/PanelShell";
import SimplePanel from "../panels/types/SimplePanel";
import SingleFeaturePanel from "../panels/singleFeature/SingleFeaturePanel";

export default function RightPanelContent() {
  const panelType = useSelector((state) => state.workspace.rightPanel.config.type);

  return (
    <PanelShell panel="rightPanel" direction="right">
      {panelType === "simple" && <SimplePanel />}
      {panelType === "singleFeature" && <SingleFeaturePanel panelId="rightPanel" />}
      {!["simple", "singleFeature"].includes(panelType) && <p>Noo panel type selected</p>}
    </PanelShell>
  );
}
