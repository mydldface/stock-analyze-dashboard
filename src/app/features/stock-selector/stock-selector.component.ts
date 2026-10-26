import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

import { AnalysisResult }
  from '../../shared/models/analysis-result';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-stock-selector',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
],
  templateUrl: './stock-selector.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./stock-selector.component.scss']
})
export class StockSelectorComponent {
  @Input()
  stocks: AnalysisResult[] = [];
  @Output()
  selected =
    new EventEmitter<AnalysisResult>();
  change(symbol: string): void {
    const stock =
      this.stocks.find(
        s => s.symbol === symbol
      );
    if (stock) {
      this.selected.emit(stock);
    }
  }
}
