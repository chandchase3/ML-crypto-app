import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import KrakenGainers from '../components/KrakenGainers';
import { 
  getKrakenAll,
  getGainers,
  getReqSpeed,
  setHistory,
  calcGainers
} from '../market/cryptoSlice';
import axios from 'axios';

const KrakenDataLoop = () => {
  const dispatch = useDispatch();

  const krakenCoins = useSelector(getKrakenAll);
  const krakenGainers = useSelector(getGainers);
  const reqSpeed = useSelector(getReqSpeed);

  // Cache data between intervals
  const indexRef = useRef(0);

  useEffect(() => {

    const interval = setInterval(async () => {
      if (indexRef.current >= krakenCoins.length) indexRef.current = 0;

      const reqCoin = krakenCoins[indexRef.current].pair;

      try {
        // Request Kraken Coin DAata
        const res = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${reqCoin}`);
        const resCoin = res.data.result[Object.keys(res.data.result)[0]];

        // Save snapshot in Redux history
        dispatch(setHistory({ reqCoin, resCoin }));

        // Recalculate top gainers using all history
        dispatch(calcGainers());

      } catch (err) {
        console.error(`Error fetching ${reqCoin}:`, err.message);
      }

      indexRef.current++;
    }, reqSpeed);

    return () => clearInterval(interval);
  }, [krakenCoins, dispatch, reqSpeed]);

  return (
    <div>
      <KrakenGainers krakenGainers={krakenGainers} />
    </div>
  );
};

export default KrakenDataLoop;
