import { Component, Input } from '@angular/core';
import { AnalysisResult } from '../../shared/models/analysis-result';

@Component({
  selector: 'app-result-table',
  standalone: true,
  templateUrl: './result-table.component.html'
})
export class ResultTableComponent {
  @Input()
  results: AnalysisResult[] = [];
}
