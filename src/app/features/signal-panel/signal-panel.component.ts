import { Component, Input } from '@angular/core';
import { AnalysisResult } from '../../shared/models/analysis-result';

@Component({
  selector: 'app-signal-panel',
  standalone: true,
  templateUrl: './signal-panel.component.html',
  styleUrls: ['./signal-panel.component.scss']
})
export class SignalPanelComponent {

  @Input()
  stock!: AnalysisResult;
}
