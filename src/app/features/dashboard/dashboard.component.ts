import { Component } from '@angular/core';


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

import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import {
  ManualAnalysisDialogComponent
} from '../manual-analysis-dialog/manual-analysis-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    UploadComponent,
    ManualAnalysisDialogComponent,
    StockSelectorComponent,
    SignalPanelComponent,
    ChartComponent,
    ResultTableComponent,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  results: AnalysisResult[] = [];

  selectedStock!: AnalysisResult;

  constructor(
    private dialog: MatDialog
  ) {}

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

  openManualAnalysis(): void {
    const dialogRef =
      this.dialog.open(
        ManualAnalysisDialogComponent,
        {
          width: '1200px',
          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.manualAnalysisFinished(
            result
          );
        }
      });
  }
}
