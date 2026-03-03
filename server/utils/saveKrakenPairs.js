// server/utils/saveKrakenPairs.js
import fs from "fs";
import path from "path";

export const saveKrakenPairsFull = () => {
  const JSON_FILE = path.join(process.cwd(), "utils", "krakenUsdPairs.json");
  const DATA_FILE = path.join(process.cwd(), "data", "krakenUsdPairsFull.json");

  try {
    // Read original pairs JSON
    const raw = fs.readFileSync(JSON_FILE, "utf-8");
    const krakenUsdPairs = JSON.parse(raw);

    // Ensure output folder exists
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Write entire response without filtering
    fs.writeFileSync(DATA_FILE, JSON.stringify(krakenUsdPairs, null, 2));
    console.log(`Full Kraken pairs saved: ${krakenUsdPairs.length} items`);
  } catch (err) {
    console.error("Failed to save full Kraken pairs:", err);
  }
};

// Run immediately if executed directly
if (process.argv[1].endsWith("saveKrakenPairs.js")) {
  saveKrakenPairsFull();
}
