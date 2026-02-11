import React from "react";
import { useSelector } from "react-redux";
import PanelShell from "../../shells/PanelShell";
import WatchlistPanel from "./watchlists/WatchlistPanel";
import ScannerPanel from "./scanner/ScannerPanel";
// import other feature panels as needed

export default function SingleFeaturePanel({ panelId = "leftPanel" }) {
  // Read the panel config from Redux
  const panelConfig = useSelector((state) => state.workspace[panelId].config);
  const { type, feature } = panelConfig;

  // Only render if the panel type is singleFeature
  if (type !== "singleFeature") return null;

  const renderFeature = () => {
    switch (feature) {
      case "watchlist":
        return <WatchlistPanel />;
      case "scanner":
        return <ScannerPanel />;
      // add more features here
      default:
        return <p>No feature selected</p>;
    }
  };

  return <PanelShell panel={panelId}>{renderFeature()}</PanelShell>;
}
