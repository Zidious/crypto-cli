import { logError, logSuccess } from '../utils';
import { CSVEXT, JSONEXT } from '../constants';
import { parseAsync } from 'json2csv';
import fs from 'fs';
import type { ExportData } from '../constants';

export const saveCoinData = async (
  options: string,
  exportData: ExportData[]
) => {
  const fileExts = options.toLowerCase().split(',');

  if (
    !fileExts.some(
      fileExt =>
        fileExt.toLowerCase() === JSONEXT || fileExt.toLowerCase() === CSVEXT
    )
  ) {
    logError(
      'Unable to export, unsupported file extension.\nPlease Check `crypto --help` for help'
    );
  }

  logSuccess('Exporting coin data...');
  if (fileExts.includes(JSONEXT)) {
    writeFile(exportData, JSONEXT);
  }

  if (fileExts.includes(CSVEXT)) {
    await writeFile(exportData, CSVEXT);
  }

  logSuccess('Export complete.');
};

const writeFile = async (exportData: ExportData[], fileExt: string) => {
  for (const coin of exportData) {
    const data =
      fileExt === JSONEXT ? JSON.stringify(coin) : await formatCsvFile(coin);
    try {
      fs.writeFileSync(formatFileName(coin.name as string, fileExt), data, {
        encoding: 'utf8'
      });
    } catch (error) {
      logError(
        `An error occured when attempting to save coin data: \n ${
          (error as Error).message
        }`
      );
    }
  }
};

const formatFileName = (coinName: string, fileExt: string): string => {
  /* use unix timestamp, resolves conflict of same filenames */
  const timestamp = new Date().valueOf();

  return `${coinName.toLowerCase()}-${timestamp}.${fileExt}`;
};

const formatCsvFile = async (coin: ExportData): Promise<string> => {
  return await parseAsync(coin as Readonly<ExportData>, {
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
        value: 'all_time_high'
      },
      {
        label: 'All Time High Percentage',
        value: 'ath_change_percentage'
      }
    ]
  });
};
