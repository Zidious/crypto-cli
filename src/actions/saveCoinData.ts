import fs from 'fs'
import { Parser } from '@json2csv/plainjs'
import { formatFileName, logError, logSuccess } from '../utils.js'
import { CSVEXT, JSONEXT } from '../constants.js'
import { CoinMarkets } from '@crypto-coffee/coingecko-api/dist/types.js'
import type { SaveCoinDataParams } from '../types.js'

export const saveCoinData = async ({
  options,
  results
}: SaveCoinDataParams) => {
  if (!options) {
    return
  }

  const fileExts = options.toLowerCase().split(',')

  if (
    !fileExts.some(
      fileExt =>
        fileExt.toLowerCase() === JSONEXT || fileExt.toLowerCase() === CSVEXT
    )
  ) {
    logError(
      'Unable to export, unsupported file extension.\nPlease Check `crypto --help` for help'
    )
  }

  const exportData: Partial<CoinMarkets>[] = []

  for (const result of results) {
    exportData.push(result)
  }

  logSuccess('Exporting coin data...')
  if (fileExts.includes(JSONEXT)) {
    writeFile(exportData, JSONEXT)
  }

  if (fileExts.includes(CSVEXT)) {
    await writeFile(exportData, CSVEXT)
  }

  logSuccess('Export complete.')
}

const writeFile = async (
  exportData: Partial<CoinMarkets>[],
  fileExt: string
) => {
  for (const coin of exportData) {
    const data =
      fileExt === JSONEXT ? JSON.stringify(coin) : await formatCsvFile(coin)

    try {
      fs.writeFileSync(formatFileName(coin.name as string, fileExt), data, {
        encoding: 'utf8'
      })
    } catch (error) {
      logError(
        `An error occured when attempting to save coin data: \n ${
          (error as Error).message
        }`
      )
    }
  }
}

const formatCsvFile = (coin: Partial<CoinMarkets>): string => {
  const parser = new Parser({
    delimiter: ',',
    excelStrings: false,
    fields: [
      {
        label: 'Name',
        value: 'name'
      },
      {
        label: 'Current Price',
        value: 'current_price'
      },
      {
        label: 'Total Volume',
        value: 'total_volume'
      },
      {
        label: 'High 24H',
        value: 'high_24h'
      },
      {
        label: 'Low 24H',
        value: 'low_24h'
      },
      {
        label: 'Price Change Percentage 24H',
        value: 'price_change_percentage_24h'
      },
      {
        label: 'All Time High',
        value: 'ath'
      },
      {
        label: 'All Time High Percentage',
        value: 'ath_change_percentage'
      }
    ]
  })
  return parser.parse(coin)
}
