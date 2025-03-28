import chalk from 'chalk'

const ERROR = chalk.bold.red
const SUCCESS = chalk.bold.green

export const logError = (message: string) => {
  console.error(ERROR(message))
  process.exit(1)
}

export const logSuccess = (message: string) => {
  console.log(SUCCESS(message))
}

export const format = (price: number) => {
  const decimalPart = price.toString().split('.')[1]
  // If the decimal part starts with 0000, it's likely a meme coin
  // and we want to show more decimal places to avoid showing 0.00
  const isMemeCoin = decimalPart && decimalPart.slice(0, 4) === '0000'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: isMemeCoin ? 10 : 2
  }).format(price)
}

export const formatFileName = (coinName: string, fileExt: string): string => {
  /* use unix timestamp, resolves conflict of same filenames */
  const timestamp = new Date().valueOf()

  return `${coinName.toLowerCase()}-${timestamp}.${fileExt}`
}
