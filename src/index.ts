#!/usr/bin/env node

import meow from 'meow';
import { app } from './app.js';

const cli = meow(
  `
  Usage:
  $ crypto --price <coin name> <additional flags>

  Options:
  --price, --p - coin name
  --priceChange, --pc - coin price change (%) in the past 24 hours
  --volume, --v - coin volume in the past 24 hours
  --high - highest price sold in the past 24 hours
  --low - lowest price sold in the past 24 hours
  --ath - coin all time high price
  --athChange, --athc - percent price change from ATH
  --version - current version of the crypto-cli tool
  --save - export all coin data to CSV and/or JSON

  Examples:
  $crypto --price bitcoin --pc
  >> bitoin: $1337 - change (24H): 13.37%

  Save coin data:
  $crypto --save json 
  $crypto --save json,csv
`,
  {
    importMeta: import.meta,
    flags: {
      price: {
        type: 'string',
        isMultiple: true,
        alias: 'p'
      },
      priceChange: {
        type: 'boolean',
        alias: 'pc'
      },
      volume: {
        type: 'boolean',
        alias: 'v'
      },
      high: {
        type: 'boolean'
      },
      low: {
        type: 'boolean'
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
);

app(cli.input[0], cli.flags);
