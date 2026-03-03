// src/providers/ProvidersLayer.jsx
import React from "react";
import KrakenStreamManager from "./kraken/KrakenStreamManager";

const ProvidersLayer = () => {
  return (
    <>
      <KrakenStreamManager />
      {/* Future: <BinanceStreamManager /> */}
    </>
  );
};

export default ProvidersLayer;
