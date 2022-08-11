import type { ExportData } from '../app';
import { logError, logSuccess } from '../utils';
import { CSVEXT, JSONCSVEXT, JSONEXT } from '../constants';
import fs from 'fs';

export const saveCoinData = (options: string, exportData: ExportData[]) => {
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
  switch (fileExts.toString()) {
    case JSONEXT:
      writeFile(exportData, JSONEXT);
      break;
    case CSVEXT:
      writeFile(exportData, CSVEXT);
      break;
    case JSONCSVEXT:
      writeFile(exportData, JSONCSVEXT);
      break;
    default:
  }
};

const writeFile = (exportData: ExportData[], fileExt: string) => {
  const timestamp = new Date().toISOString().substring(0, 10);
  for (const coin of exportData) {
    try {
      fs.writeFileSync(
        `${(coin.name as string).toLowerCase()}-${timestamp}.${fileExt}`,
        JSON.stringify(coin),
        { encoding: 'utf8' }
      );
    } catch (error) {
      logError(
        `An error occured when attempting to save coin data: \n ${
          (error as Error).message
        }`
      );
    }
  }
  logSuccess('Export complete.');
};
