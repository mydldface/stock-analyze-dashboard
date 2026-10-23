import { Component, Input } from '@angular/core';
import { AnalysisResult } from '../../shared/models/analysis-result';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-signal-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './signal-panel.component.html',
  styleUrls: ['./signal-panel.component.scss']
})
export class SignalPanelComponent {

  @Input()
  stock!: AnalysisResult;
}
