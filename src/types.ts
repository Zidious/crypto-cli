import type { CoinMarkets } from '@crypto-coffee/coingecko-api/dist/types.js'

export interface Flags {
  priceChange: boolean | null
  volume: boolean | null
  high: boolean | null
  low: boolean | null
  ath: boolean | null
  athChange: boolean | null
  save: string | null
}

export interface SaveCoinDataParams {
  options: string | null
  results: CoinMarkets[]
}

export interface PriceStatsParams {
  results: CoinMarkets[]
  flags: Flags
}
