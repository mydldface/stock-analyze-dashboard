import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { AnalysisResult }
  from '../../shared/models/analysis-result';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  @Output()
  uploaded =
    new EventEmitter<AnalysisResult[]>();

  // selectedFile: File | null = null;
  selectedFile?: File;
  constructor(
    private http: HttpClient
  ) {
  }

  onFileSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (
      input.files &&
      input.files.length > 0
    ) {

      this.selectedFile =
        input.files[0];
    }
  }

  upload(): void {

    if (!this.selectedFile) {
      alert(
        'Bitte eine Datei auswählen.'
      );
      return;
    }

    const formData =
      new FormData();

    formData.append(
      'file',
      this.selectedFile
    );

    this.http
      .post<AnalysisResult[]>(
        '/api/stocks/upload',
        formData
      )
      .subscribe({

        next: (results) => {

          this.uploaded.emit(
            results
          );
        },
        error: (error) => {
          console.error(
            'Upload fehlgeschlagen',
            error
          );
          alert(
            'Upload fehlgeschlagen.'
          );
        }
      });
  }

  reset(): void {
    this.selectedFile = undefined;
  }
}
