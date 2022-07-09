import CoinGeckoAPI from '@crypto-coffee/coingecko-api';
import { logError, logSuccess, format } from './utils';

interface Flags {
  price: string[];
  priceChange: boolean;
  volume: boolean;
  high: boolean;
  low: boolean;
  ath: boolean;
  athChange: boolean;
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

export const app = async (crypto: string, flags: Record<string, unknown>) => {
  console.log('hello world');
  if (crypto === 'crypto') {
    console.log('hit after crypto');
    const gecko = new CoinGeckoAPI();

    const { price, priceChange, volume, high, low, ath, athChange } =
      flags as unknown as Flags;

    if (price.length) {
      try {
        const result: CoinMarketResponse[] = await gecko.coinMarkets({
          vs_currency: 'usd',
          ids: price.toString()
        });

        if (!result.length) {
          logError(`Unknown coin: ${price.toString()}`);
        }
        console.log('res', result);
        for (const {
          name,
          current_price,
          total_volume,
          high_24h,
          low_24h,
          price_change_percentage_24h: percent24h,
          ath: athPrice,
          ath_change_percentage: athPercent
        } of result) {
          const priceRes = `${name}: ${format(current_price)}`;

          let priceChangeRes;
          let volumeRes;
          let highRes;
          let lowRes;
          let athRes;
          let athChangeRes;

          if (priceChange) {
            priceChangeRes = `change (24H): ${percent24h.toFixed(2)}%`;
          }

          if (high) {
            highRes = `high (24H): ${format(high_24h)}`;
          }

          if (low) {
            lowRes = `low (24H): ${format(low_24h)}`;
          }

          if (volume) {
            volumeRes = `24H volume: ${format(total_volume)}`;
          }

          if (ath) {
            athRes = `ATH: ${format(athPrice)}`;
          }

          if (athChange) {
            athChangeRes = `ATH (%): ${athPercent.toFixed(2)}%`;
          }

          logSuccess(
            [
              priceRes,
              priceChangeRes,
              volumeRes,
              highRes,
              lowRes,
              athRes,
              athChangeRes
            ]
              .filter(Boolean)
              .join(' - ')
          );
        }
      } catch (error) {
        logError(`An error occured: ${(error as Error).message}`);
      }
    }
  }
};
