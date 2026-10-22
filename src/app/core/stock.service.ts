import {AnalysisResult} from '../shared/models/analysis-result';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockData} from '../shared/models/stock-data';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient
  ) {
  }

  uploadExcel(
    file: File
  ): Observable<AnalysisResult[]> {

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    return this.http.post<AnalysisResult[]>(
      '/api/stocks/upload',
      formData
    );
  }

  analyzeStock(
    stock: StockData
  ): Observable<AnalysisResult> {

    return this.http.post<AnalysisResult>(
      'http://localhost:8080/api/stocks/analyze',
      stock
    );
  }
}
