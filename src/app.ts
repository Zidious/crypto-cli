import CoinGeckoAPI from '@crypto-coffee/coingecko-api';
import { logError, logSuccess, format } from './utils';

interface Flags {
  price: string[];
}

interface CoinMarketResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: unknown;
  last_updated: string;
}

export const app = async (coffee: string, flags: Record<string, unknown>) => {
  const coffeeParsed = coffee.toLowerCase();

  if (coffeeParsed !== 'coffee') {
    logError(`Unknown command: ${coffee}`);
  }

  const gecko = new CoinGeckoAPI();

  const { price } = flags as unknown as Flags;

  if (price.length) {
    try {
      const result: CoinMarketResponse[] = await gecko.coinMarkets({
        vs_currency: 'usd',
        ids: price.toString()
      });

      if (!result.length) {
        logError(`Unknown coin: ${price.toString()}`);
      }

      for (const { name, current_price } of result) {
        logSuccess(`${name}: ${format(current_price)}`);
      }
    } catch (error) {
      logError(`An error occured: ${(error as Error).message}`);
    }
  }
};
