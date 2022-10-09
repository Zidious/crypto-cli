/** contstants */
export const JSONEXT = 'json';
export const CSVEXT = 'csv';

/** types */
export type ExportData = Record<string, string | number>;

export type Action = 'price';
export interface Flags {
  priceChange: boolean;
  volume: boolean;
  high: boolean;
  low: boolean;
  ath: boolean;
  athChange: boolean;
  save: string;
}
