import chalk from 'chalk';

const ERROR = chalk.bold.red;
const SUCCESS = chalk.bold.green;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const logError = (message: string) => {
  console.error(ERROR(message));
  process.exit(1);
};

export const logSuccess = (message: string) => {
  console.log(SUCCESS(message));
};

export const format = (price: number) => {
  return formatter.format(price);
};
