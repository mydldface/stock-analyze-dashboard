import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { AnalysisResult }
  from '../../shared/models/analysis-result';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @Output()
  uploaded =
    new EventEmitter<AnalysisResult[]>();

  @Output()
  cleared = new EventEmitter<void>();

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
    this.cleared.emit();
  }
}
