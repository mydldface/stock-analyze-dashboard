import {
  Component,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';



import { AnalysisResult }
  from '../../shared/models/analysis-result';

import { StockSelectorComponent }
  from '../stock-selector/stock-selector.component';

import { SignalPanelComponent }
  from '../signal-panel/signal-panel.component';

import { ChartComponent }
  from '../chart/chart.component';

import { ResultTableComponent }
  from '../result-table/result-table.component';

@Component({
  selector: 'app-analysis-dialog',

  standalone: true,

  imports: [
    MatDialogModule,
    StockSelectorComponent,
    SignalPanelComponent,
    ChartComponent,
    ResultTableComponent
],

  templateUrl:
    './analysis-dialog.component.html',

  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls:
    ['./analysis-dialog.component.scss']
})
export class AnalysisDialogComponent {

  results: AnalysisResult[];

  selectedStock?: AnalysisResult;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: AnalysisResult[]
  ) {
    this.results = data;

    if (data.length > 0) {
      this.selectedStock = data[0];
    }
  }

  stockSelected(
    stock: AnalysisResult
  ): void {

    this.selectedStock = stock;
  }
}
