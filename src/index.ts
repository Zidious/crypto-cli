import meow from 'meow';
import { app } from './app';

const cli = meow(
  `
    Usage:
    $ coffee 

    Options:
    --price, -p - Coin name

    Examples:
    $coffee --price bitcoin 
    >> bitoin: $1337 
`,
  {
    flags: {
      price: {
        type: 'string',
        isMultiple: true,
        alias: 'p'
      }
    }
  }
);

app(cli.input[0], cli.flags);
