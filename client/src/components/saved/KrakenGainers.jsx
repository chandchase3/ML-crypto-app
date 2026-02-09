import React from 'react';
import Loading from './components/Loading';

// receive krakenGainers as prop
const KrakenGainers = ({ krakenGainers }) => {
  if (!krakenGainers || krakenGainers.length === 0) return <Loading />;

  return (
    <div>
      {krakenGainers.map(({ pair, coin }) => (
        <p key={pair}>
          {pair}: {coin.c[0]} ({coin.p[1]}%) {/* last price + 24h percent change */}
        </p>
      ))}
    </div>
  );
};

export default KrakenGainers;
