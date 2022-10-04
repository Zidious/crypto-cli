import CoinGeckoAPI from '@crypto-coffee/coingecko-api';
import { saveCoinData } from './actions/saveCoinData';
import { logError, logSuccess, format } from './utils';

export type ExportData = Record<string, string | number>;

interface Flags {
  price: string[];
  priceChange: boolean;
  volume: boolean;
  high: boolean;
  low: boolean;
  ath: boolean;
  athChange: boolean;
  save: string;
}

export const app = async (action: string, flags: Record<string, unknown>) => {
  const { price, priceChange, volume, high, low, ath, athChange, save } =
    flags as unknown as Flags;

  if (!price.length) {
    logError('No coin name provided. Check `crypto --help` for help');
  }

  const gecko = new CoinGeckoAPI();
  try {
    const result = await gecko.coinMarkets({
      vs_currency: 'usd',
      ids: price.toString()
    });

    if (!result.length) {
      logError(`Unknown coin: ${price.toString()}`);
    }

    const exportCoinData: ExportData[] = [];
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
        volumeRes = `volume (24H): ${format(total_volume)}`;
      }

      if (ath) {
        athRes = `ATH: ${format(athPrice)}`;
      }

      if (athChange) {
        athChangeRes = `ATH (%): ${athPercent.toFixed(2)}%`;
      }

      exportCoinData.push({
        name,
        current_price,
        total_volume,
        high_24h,
        low_24h,
        price_change_percentage_24h: percent24h,
        all_time_high: athPrice,
        ath_change_percentage: athPercent
      });

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

    if (save) {
      await saveCoinData(save, exportCoinData);
    }

    process.exit(0);
  } catch (error) {
    logError(
      `An error occured: ${
        (error as Error).message
      }\n Please report the issue here: https://github.com/Zidious/crypto-cli`
    );
  }
};
