import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AnalysisResult }
  from '../../shared/models/analysis-result';

import { StockData }
  from '../../shared/models/stock-data';

import { StockService }
  from '../../core/stock.service';
import {CommonModule} from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manual-analysis',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './manual-analysis.component.html',
  styleUrls: ['./manual-analysis.component.scss']
})
export class ManualAnalysisComponent {

  @Output()
  analyzed =
    new EventEmitter<AnalysisResult>();

  model: StockData = {
    symbol: '',
    prevOpen: 0,
    prevHigh: 0,
    prevLow: 0,
    prevClose: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    currentPrice: 0,
    volume: 0
  };

  constructor(
    private stockService:
    StockService
  ) {
  }
  analyze(): void {
    this.stockService
      .analyzeStock(this.model)
      .subscribe(result => {
        this.analyzed.emit(
          result
        );
      });
  }
}
