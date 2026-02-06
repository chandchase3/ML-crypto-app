const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.resolve('./data/kraken_pairs.txt');
const OUTPUT_PATH = path.resolve('./data/kraken_pairs.json');

const usdSymbols = ['USD', 'USDT', 'USDC'];

const raw = fs.readFileSync(INPUT_PATH, 'utf8');

const pairs = raw
  .split(',')
  .map(p => p.trim())
  .filter(Boolean)
  .map(pair => {
    const quote = usdSymbols.find(q => pair.endsWith(q));

    if (!quote) {
      return {
        pair: pair,
        base: null,
        quote: null,
        enabled: false,
        source: 'kraken',
        reasonDisabled: 'unknown-quote'
      };
    }

    const base = pair.slice(0, pair.length - quote.length);

    return {
      pair: pair,
      base: base,
      quote: quote,
      enabled: true,
      source: 'kraken'
    };
  });

fs.writeFileSync(
  OUTPUT_PATH,
  JSON.stringify(pairs, null, 2),
  'utf8'
);

console.log(`Converted ${pairs.length} pairs → ${OUTPUT_PATH}`);
