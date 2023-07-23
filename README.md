# crypto-cli

[![GitHub contributors](https://img.shields.io/github/contributors/zidious/crypto-cli)](https://github.com/zidious/crypto-cli/graphs/contributors)
[![npm](https://img.shields.io/npm/dt/coffee-crypto-cli)](https://www.npmjs.com/package/coffee-crypto-cli)

> Cryptocurrency CLI price tool

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Flags](#flags)
4. [Local Development](#local-development)
5. [Contributing](#contributing)

## Installation

You can install the crypto-cli tool via npm and yarn:

```sh
npm install -g coffee-crypto-cli
```

```sh
yarn add global coffee-crypto-cli
```

## Usage

```sh
$ crypto --price bitcoin --volume --ath
>> Bitcoin: $20,000 - volume: $13,337 - ATH: $68,000
```

## Flags

Note: `--price, --p` is required for any of the subsequent flags.

```sh
--price, --p - coin name
```

Coin price change (%) in the past 24 hours.

```sh
--price-change, --pc
```

Coin volume in the past 24 hours.

```sh
--volume, --v
```

Highest price sold in the past 24 hours.

```sh
--high
```

Lowest price sold in the past 24 hours.

```sh
--low
```

Coin all time high price.

```sh
--ath
```

Percent price change from the all time high.

```sh
--ath-change, --athc
```

Save coin data via JSON and/or CSV

```sh
--save json
--save json,csv
```

CLI help message.

```sh
--help
```

Current version.

```sh
--version
```

## Local Development

First things first, we'll need to clone the repo, install the dependencies, and, build the project.

```sh
git clone https://github.com/Zidious/crypto-cli.git
```

```sh
yarn install && yarn build
```

To run the CLI locally, use the below command followed by the flag you want to run.

```sh
node dist/index.js --price bitcoin
```

## Contributing

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

## Shoutouts

Cryptocurrency coin statistics are gathered from the [CoinGecko API](https://www.coingecko.com/en/api/documentation).
