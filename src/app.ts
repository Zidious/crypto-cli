import CoinGeckoAPI from '@crypto-coffee/coingecko-api';
import { saveCoinData } from './actions/saveCoinData';
import { logError } from './utils';
import { priceStats } from './actions/priceStats';
import type { Action, ExportData, Flags } from './constants';

interface AppParams {
  action: Action;
  actionArg: string;
  flags: Flags;
}

const actions: Action[] = ['price'];

export const app = async ({ action, actionArg, flags }: AppParams) => {
  console.log({ action, actionArg, flags });

  const { priceChange, volume, high, low, ath, athChange, save } = flags;

  if (!actions.includes(action)) {
    logError('No action provided. Check `crypto --help` for help');
  }

  const gecko = new CoinGeckoAPI();
  if (action === 'price') {
    const price = actionArg.split(',');
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
  }
};
