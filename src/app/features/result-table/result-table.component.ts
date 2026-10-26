import { AnalysisResult } from '../../shared/models/analysis-result';

import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './result-table.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent {
  @Input()
  results: AnalysisResult[] = [];

  displayedColumns = [
    'symbol',
    'pattern',
    'signal',
    'prevVolume',
    'volume',
    'volumeRatio'
  ];
}
