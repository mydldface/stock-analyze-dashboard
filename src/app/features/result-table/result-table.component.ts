import { Component, Input } from '@angular/core';
import { AnalysisResult } from '../../shared/models/analysis-result';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent {
  @Input()
  results: AnalysisResult[] = [];

  displayedColumns = [
    'symbol',
    'pattern',
    'signal'
  ];
}
