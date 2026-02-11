// src/utils/krakenPairs.js
import pairs from "./pairs.json";

/* ---------------- build lookup tables ---------------- */

// name => wsname
const nameToWs = new Map();
// base => { USD?, USDT?, USDC? }
const baseToQuotes = new Map();

for (const { name, wsname } of pairs) {
  nameToWs.set(name, wsname);

  const [base, quote] = name.split("/");
  if (!baseToQuotes.has(base)) {
    baseToQuotes.set(base, {});
  }

  baseToQuotes.get(base)[quote] = wsname;
}

/* ---------------- helpers ---------------- */

/**
 * Get best Kraken WS pair with fallback:
 * USD → USDT → USDC
 */
export function resolveKrakenWsPair(symbol) {
  const [base] = symbol.split("/");
  const quotes = baseToQuotes.get(base);
  if (!quotes) return null;

  return (
    quotes.USD ||
    quotes.USDT ||
    quotes.USDC ||
    null
  );
}

/**
 * Convert scanner symbols → Kraken WS symbols
 */
export function toKrakenWsPairs(symbols) {
  return symbols
    .map(resolveKrakenWsPair)
    .filter(Boolean);
}

/**
 * Convert Kraken WS symbol back to display name
 */
export function fromKrakenWsPair(wsname) {
  for (const [name, ws] of nameToWs.entries()) {
    if (ws === wsname) return name;
  }
  return null;
}
