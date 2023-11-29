import { format, logSuccess } from '../utils.js'
import type { PriceStatsParams } from '../types.js'

export const priceStats = ({ results, flags }: PriceStatsParams): void => {
  for (const result of results) {
    const priceRes = `${result.name}: ${format(result.current_price)}`
    let priceChangeRes
    let volumeRes
    let highRes
    let lowRes
    let athRes
    let athChangeRes

    if (flags.priceChange) {
      priceChangeRes = `change (24H): ${result.price_change_24h.toFixed(2)}%`
    }

    if (flags.high) {
      highRes = `high (24H): ${format(result.high_24h)}`
    }

    if (flags.low) {
      lowRes = `low (24H): ${format(result.low_24h)}`
    }

    if (flags.volume) {
      volumeRes = `volume (24H): ${format(result.total_volume)}`
    }

    if (flags.ath) {
      athRes = `ATH: ${format(result.ath)}`
    }

    if (flags.athChange) {
      athChangeRes = `ATH (%): ${result.atl_change_percentage.toFixed(2)}%`
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
    )
  }
}
