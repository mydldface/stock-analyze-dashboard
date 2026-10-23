import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisResult }
  from '../../shared/models/analysis-result';

import { UploadComponent }
  from '../upload/upload.component';

import { StockSelectorComponent }
  from '../stock-selector/stock-selector.component';

import { SignalPanelComponent }
  from '../signal-panel/signal-panel.component';

import { ChartComponent }
  from '../chart/chart.component';

import { ResultTableComponent }
  from '../result-table/result-table.component';

import { ManualAnalysisComponent }
  from '../manual-analysis/manual-analysis.component';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    UploadComponent,
    ManualAnalysisComponent,
    StockSelectorComponent,
    SignalPanelComponent,
    ChartComponent,
    ResultTableComponent,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  results: AnalysisResult[] = [];

  selectedStock!: AnalysisResult;

  uploadFinished(
    data: AnalysisResult[]
  ): void {

    this.results = data;

    if (data.length > 0) {

      this.selectedStock =
        data[0];
    }
  }

  stockSelected(
    stock: AnalysisResult
  ): void {

    this.selectedStock =
      stock;
  }

  manualAnalysisFinished(
    result: AnalysisResult
  ): void {
    this.results = [result];
    this.selectedStock =
      result;
  }

  resetDashboard(): void {
    this.results = [];
    this.selectedStock = undefined as any;
  }
}
