#!/usr/bin/env node

import meow from 'meow';
import { app } from './app';

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

  Examples:
  $crypto --price bitcoin --pc
  >> bitoin: $1337 - change (24H): 13.37%
`,
  {
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
      }
    }
  }
);

app(cli.input[0], cli.flags);
