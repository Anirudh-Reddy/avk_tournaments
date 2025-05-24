import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';
import { TextareaModule } from 'primeng/textarea';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-upload-photo',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, TextareaModule , ToastModule, LoadingComponent],
  providers: [MessageService],
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent {
  base64Image: string | null = null;
  caption: string = '';
  showLoader = false
  constructor(private api: ApiService, private toast: MessageService) {}

  onImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.base64Image = reader.result as string);
    reader.readAsDataURL(file);
  }

  upload() {
    if (!this.base64Image) return;
    this.showLoader = true;
    this.api.uploadPhoto({ image: this.base64Image, caption: this.caption }).subscribe({
      next: () => {
      this.toast.add({ severity: 'success', summary: 'Uploaded', detail: 'Photo added to gallery' });
      this.base64Image = null;
      this.caption = '';
      this.showLoader = false
    }, error:()=>{
      this.showLoader = false
    }
    });
  }
}
