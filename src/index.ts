#!/usr/bin/env node

import meow from 'meow'
import CoinGeckoAPI from '@crypto-coffee/coingecko-api'
import { logError } from './utils.js'
import { saveCoinData } from './actions/saveCoinData.js'
import type { Flags } from './types.js'
import { priceStats } from './actions/priceStats.js'

const cli = meow(
  `
  Usage:
  $ crypto <coin ticker(s)> <additional flags>

  Options:
  --price-change, --pc	Coin price change (%) in the past 24 hours
  --volume, --v	Coin volume in the past 24 hours
  --ath-change, -athc	Percent price change from the all time high
  --high, --h	Highest price sold in the past 24 hours
  --low, --l	Lowest price sold in the past 24 hours
  --ath	Coin all time high price
  --save json,csv	Save coin data via JSON and/or CSV
  --version	Current version

  Examples:
  $crypto bitcoin --pc
  >> bitoin: $1337 - change (24H): 13.37%

  $crypto bitcoin,ethereum 
  >> bitcoin: $1337
  >> ethereum: $1337

  Save coin data:
  $crypto bitcoin --save json 
  $crypto bitcoin --save json,csv
`,
  {
    importMeta: import.meta,
    flags: {
      priceChange: {
        type: 'boolean',
        alias: 'pc'
      },
      volume: {
        type: 'boolean',
        alias: 'v'
      },
      high: {
        type: 'boolean',
        alias: 'h'
      },
      low: {
        type: 'boolean',
        alias: 'l'
      },
      ath: {
        type: 'boolean'
      },
      athChange: {
        type: 'boolean',
        alias: 'athc'
      },
      save: {
        type: 'string'
      }
    }
  }
)

const app = async () => {
  const { save } = cli.flags as Flags
  const coinTickers = cli.input[0].toLowerCase().trim()

  if (!coinTickers) {
    logError('No coin name provided. Check `crypto --help` for help')
  }

  const gecko = new CoinGeckoAPI.default()

  const results = await gecko.coinMarkets({
    vs_currency: 'usd',
    ids: coinTickers
  })

  if (!results.length) {
    logError(`Unknown coin: ${coinTickers}`)
  }

  priceStats({
    results,
    flags: cli.flags as Flags
  })

  await saveCoinData({
    options: save,
    results
  })

  process.exit(0)
}

app().catch(error => {
  logError(
    `An error occured: ${
      (error as Error).message
    }\n Please report the issue here: https://github.com/Zidious/crypto-cli/issues`
  )
})
