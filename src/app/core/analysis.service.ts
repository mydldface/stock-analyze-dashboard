import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnalysisResult} from '../shared/models/analysis-result';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(
    private http: HttpClient
  ) {}

  upload(
    file: File
  ): Observable<AnalysisResult[]> {

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    return this.http.post<
      AnalysisResult[]
    >(
      '/api/stocks/upload',
      formData
    );
  }
}
