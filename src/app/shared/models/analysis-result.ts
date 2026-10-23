export interface AnalysisResult {

  symbol: string;

  currentPrice: number;
  volumeRatio: number;

  prevOpen: number;
  prevHigh: number;
  prevLow: number;
  prevClose: number;
  prevVolume: number;

  open: number;
  high: number;
  low: number;
  close: number;

  volume: number;

  support: number;
  resistance: number;

  pattern: string;
  signal: string;

  shortTrend: string;
  mediumTrend: string;
  longTrend: string;

  fibonacciLevels:
    Record<string, number>;
}
