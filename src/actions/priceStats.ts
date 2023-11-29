import { format, logSuccess } from '../utils.js'
import type { Flags } from '../constants.js'

interface PriceStatsParams {
  name: string
  current_price: number
  total_volume: number
  high_24h: number
  low_24h: number
  percent24h: number
  athPrice: number
  athPercent: number
}

type PriceStatFlags = Omit<Flags, 'save'>

export const priceStats = (
  {
    name,
    current_price,
    total_volume,
    high_24h,
    low_24h,
    percent24h,
    athPrice,
    athPercent
  }: PriceStatsParams,
  { price, priceChange, high, low, volume, ath, athChange }: PriceStatFlags
): void => {
  const priceRes = `${name}: ${format(current_price)}`
  let priceChangeRes
  let volumeRes
  let highRes
  let lowRes
  let athRes
  let athChangeRes

  if (priceChange) {
    priceChangeRes = `change (24H): ${percent24h.toFixed(2)}%`
  }

  if (high) {
    highRes = `high (24H): ${format(high_24h)}`
  }

  if (low) {
    lowRes = `low (24H): ${format(low_24h)}`
  }

  if (volume) {
    volumeRes = `volume (24H): ${format(total_volume)}`
  }

  if (ath) {
    athRes = `ATH: ${format(athPrice)}`
  }

  if (athChange) {
    athChangeRes = `ATH (%): ${athPercent.toFixed(2)}%`
  }

  logSuccess(
    [priceRes, priceChangeRes, volumeRes, highRes, lowRes, athRes, athChangeRes]
      .filter(Boolean)
      .join(' - ')
  )
}
