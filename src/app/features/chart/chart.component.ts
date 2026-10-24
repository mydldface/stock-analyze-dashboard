import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import {
  CandlestickSeries,
  ColorType,
  createChart,
  IChartApi,
  LineStyle,
  UTCTimestamp
} from 'lightweight-charts';

import { AnalysisResult }
  from '../../shared/models/analysis-result';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent
  implements AfterViewInit, OnChanges {

  @Input()
  stock?: AnalysisResult;

  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef<HTMLDivElement>;

  private chart?: IChartApi;

  private readonly fibColors:
    Record<string, string> = {

    '23.6': '#ff9800',
    '38.2': '#2196f3',
    '50': '#4caf50',
    '61.8': '#e91e63',
    '78.6': '#8e24aa'
  };

  ngAfterViewInit(): void {

    if (this.stock) {
      this.renderChart();
    }
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['stock'] &&
      this.chartContainer
    ) {
      this.renderChart();
    }
  }

  private renderChart(): void {

    if (!this.stock) {
      return;
    }

    if (this.chart) {
      this.chart.remove();
    }

    this.chart = createChart(
      this.chartContainer.nativeElement,
      {
        width: this.chartContainer.nativeElement.clientWidth,
        height: 600,
        timeScale: {
          borderColor: '#cbd5e1',
          barSpacing: 30,
          rightOffset: 0
        },
        layout: {
          background: {
            type: ColorType.Solid,
            color: '#ffffff'
          },
          textColor: '#374151'
        },

        grid: {
          vertLines: {
            color: '#e5e7eb'
          },
          horzLines: {
            color: '#e5e7eb'
          }
        },

        rightPriceScale: {
          borderColor: '#cbd5e1'
        }
      }
    );

    const candleSeries =
      this.chart.addSeries(
        CandlestickSeries,
        {
          upColor: '#26a69a',
          downColor: '#ef5350',
          wickUpColor: '#26a69a',
          wickDownColor: '#ef5350',
          borderVisible: false
        }
      );

    const now = Math.floor(Date.now() / 1000);
    candleSeries.setData([
      {
        time: (now - 86400) as UTCTimestamp,
        open: this.stock.prevOpen,
        high: this.stock.prevHigh,
        low: this.stock.prevLow,
        close: this.stock.prevClose
      },
      {
        time: now as UTCTimestamp,
        open: this.stock.open,
        high: this.stock.high,
        low: this.stock.low,
        close: this.stock.close
      }
    ]);

    setTimeout(() => {
      this.chart?.timeScale().setVisibleLogicalRange({
        from: -2,
        to: 4
      });
    }, 0);
  /*
    this.chart.timeScale().fitContent();

    this.chart.timeScale().setVisibleLogicalRange({
      from: -0.5,
      to: 1.5
    });

   */

    this.addCurrentPriceLine(
      candleSeries
    );
    this.addFibonacciLines(
      candleSeries
    );
    this.chart
      .timeScale()
      .fitContent();
  }

  private addCurrentPriceLine(
    candleSeries: any): void {

    candleSeries.createPriceLine({
      price: this.stock!.close,
      color: '#26a69a',
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: ''
    });
  }

  private addFibonacciLines(
    candleSeries: any): void {
    const fibs = this.stock!.fibonacciLevels;
    Object.entries(fibs)
      .forEach(([level, value]) => {
        candleSeries
          .createPriceLine({
            price: value,
            color: this.fibColors[level] ?? '#64748b',
            lineWidth: 2,
            lineStyle: LineStyle.Dashed,
            axisLabelVisible: true,
            title: `Fib ${level}`
          });
      });
  }
}
