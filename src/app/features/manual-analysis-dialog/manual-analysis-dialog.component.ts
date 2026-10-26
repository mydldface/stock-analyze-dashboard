import { Component } from '@angular/core';

import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule }
  from '@angular/material/button';

import { CommonModule }
  from '@angular/common';

import { AnalysisResult }
  from '../../shared/models/analysis-result';

import { ManualAnalysisComponent }
  from '../manual-analysis/manual-analysis.component';

import { ChartComponent }
  from '../chart/chart.component';

@Component({
  selector: 'app-manual-analysis-dialog',

  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ManualAnalysisComponent,
    ChartComponent
  ],

  templateUrl:
    './manual-analysis-dialog.component.html',

  styleUrls:
    ['./manual-analysis-dialog.component.scss']
})
export class ManualAnalysisDialogComponent {

  result?: AnalysisResult;

  constructor(
    private dialogRef:
    MatDialogRef<
      ManualAnalysisDialogComponent
    >
  ) {
  }

  analysisFinished(
    result: AnalysisResult
  ): void {

    this.result = result;
  }

  übernehmen(): void {
    this.dialogRef.close(
      this.result
    );
  }
}
