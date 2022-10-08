import CoinGeckoAPI from '@crypto-coffee/coingecko-api';
import { saveCoinData } from './actions/saveCoinData';
import { logError } from './utils';
import { priceStats } from './actions/priceStats';
import type { ExportData, Flags } from './constants';

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

      priceStats(
        {
          name,
          current_price,
          total_volume,
          high_24h,
          low_24h,
          percent24h,
          athPrice,
          athPercent
        },
        { price, priceChange, high, low, volume, ath, athChange }
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
