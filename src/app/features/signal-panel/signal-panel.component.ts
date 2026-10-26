import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AnalysisResult } from '../../shared/models/analysis-result';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-signal-panel',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule
],
  templateUrl: './signal-panel.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./signal-panel.component.scss']
})
export class SignalPanelComponent {

  @Input()
  stock!: AnalysisResult;
}
