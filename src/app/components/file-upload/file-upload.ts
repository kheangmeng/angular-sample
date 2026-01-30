import { Component, effect, input, output, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'file-upload',
  standalone: true,
  imports: [MatButton, MatIconModule, MatProgressBarModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css'
})
export class FileUpload {
  private httpClient = inject(HttpClient);
  requiredFileType = input<string>('image/*');
  imageUrl = input<string | undefined>('');
  onFileUploaded = output<string>();

  fileName = '';
  uploadProgress:number| null = null;

  constructor(private http: HttpClient) {
    effect(() => {
      console.log('Image URL changed:', this.imageUrl());
      this.fileName = this.imageUrl() || '';
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.onFileUploaded.emit(this.fileName);
      const formData = new FormData();
      formData.append("file", file);

      const upload$ = this.http.post("/api/upload", formData, {
          reportProgress: true,
          observe: 'events'
      })
      .subscribe((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            console.log('Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes');
            break;
          case HttpEventType.Response:
            console.log('Finished uploading!');
            break;
        }
      });
    }
  }
}
