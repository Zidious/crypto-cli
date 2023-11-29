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

## Usage

```sh
$ crypto bitcoin
>> Bitcoin: $20,000
```

## Flags

| Name                     | Description                                 |
| ------------------------ | ------------------------------------------- |
| `--price-change`, `--pc` | Coin price change (%) in the past 24 hours  |
| `--volume`, `--v`        | Coin volume in the past 24 hours            |
| `--ath-change`, `--athc` | Percent price change from the all time high |
| `--high`, `--h`          | Highest price sold in the past 24 hours     |
| `--low`, `--l`           | Lowest price sold in the past 24 hours      |
| `--ath`                  | Coin all time high price                    |
| `--save json,csv`        | Save coin data via JSON and/or CSV          |
| `--help`                 | Flag description and usage examples         |
| `--version`              | Current version                             |

## Local Development

Clone the repo, install the dependencies, and, build the project.

```sh
git clone https://github.com/Zidious/crypto-cli.git
```

```sh
yarn install --frozen-lockfile && yarn build
```

To run the CLI locally:

```sh
node dist/index.js bitcoin
```

## Contributing

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

## Shoutouts

Cryptocurrency coin statistics are gathered from the [CoinGecko API](https://www.coingecko.com/en/api/documentation).
