import React from "react";
import { useSelector } from "react-redux";
import PanelShell from "../shells/PanelShell";
import SimplePanel from "../panels/types/SimplePanel";
import SingleFeaturePanel from "../panels/singleFeature/SingleFeaturePanel";


export default function LeftPanelContent() {
  const panelType = useSelector((state) => state.workspace.leftPanel.config.type);

  return (
    <PanelShell panel="leftPanel" direction="left">
      {panelType === "simple" && <SimplePanel />}
      {panelType === "singleFeature" && <SingleFeaturePanel panelId="leftPanel" />}
      {!["simple", "singleFeature"].includes(panelType) && <p>Noo panel type selected</p>}
    </PanelShell>
  );
}
