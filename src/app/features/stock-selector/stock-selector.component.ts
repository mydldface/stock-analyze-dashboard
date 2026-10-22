import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { AnalysisResult }
  from '../../shared/models/analysis-result';

@Component({
  selector: 'app-stock-selector',
  standalone: true,
  templateUrl: './stock-selector.component.html',
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
