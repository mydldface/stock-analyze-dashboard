import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';

import {
  createChart,
  CandlestickSeries,
  IChartApi
} from 'lightweight-charts';

import { AnalysisResult }
  from '../../shared/models/analysis-result';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

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
  stock: AnalysisResult | null = null;

  @ViewChild('chartContainer')
  container!: ElementRef;

  private chart!: IChartApi;

  private initialized =
    false;

  ngAfterViewInit(): void {

    this.chart =
      createChart(
        this.container.nativeElement,
        {
          width: this.container.nativeElement.clientWidth,
          height: 500
        }
      );

    this.initialized = true;

    this.renderChart();
  }

  ngOnChanges(): void {

    this.renderChart();
  }

  private renderChart(): void {
    if (!this.initialized) {
      return;
    }

    if (!this.stock) {

      this.chart.remove();

      this.chart =
        createChart(
          this.container.nativeElement,
          {
            width:
            this.container.nativeElement.clientWidth,
            height: 500
          }
        );

      return;
    }

    this.chart.remove();

    this.chart =
      createChart(
        this.container.nativeElement,
        {
          width:
          this.container.nativeElement.clientWidth,
          height: 500,

          timeScale: {
            barSpacing: 40,
            rightOffset: 10
          }
        }
      );

    const candleSeries =
      this.chart.addSeries(
        CandlestickSeries
      );

    candleSeries.setData([
      {
        time: '2026-10-19',
        open: this.stock.prevOpen,
        high: this.stock.prevHigh,
        low: this.stock.prevLow,
        close: this.stock.prevClose
      },
      {
        time: '2026-10-20',
        open: this.stock.open,
        high: this.stock.high,
        low: this.stock.low,
        close: this.stock.close
      }
    ]);
  }
}
