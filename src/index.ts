#!/usr/bin/env node

import meow from 'meow';
import { app } from './app';

const cli = meow(
  `
    Usage:
    $ crypto 

    Options:
    --price, -p - Coin name

    Examples:
    $crypto --price bitcoin 
    >> bitoin: $1337 
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
