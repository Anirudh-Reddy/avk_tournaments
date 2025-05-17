import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-add-announcement',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent {
  form = this.fb.group({
    message: ['', Validators.required],
    sport: ['Volleyball', Validators.required],
    createdBy: ['Admin']
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: MessageService
  ) {}

  submit() {
    if (this.form.valid) {
      const cleanValue = {
        message: this.form.value.message ?? '',
        sport: this.form.value.sport ?? 'Volleyball',
        createdBy: this.form.value.createdBy ?? 'Admin'
      };

      this.api.createAnnouncement(cleanValue).subscribe(() => {
        this.toast.add({
          severity: 'success',
          summary: 'Announcement Posted',
          detail: 'New announcement added'
        });
        this.form.reset();
        this.form.patchValue({ sport: 'Volleyball', createdBy: 'Admin' });
      });
    }
  }

}
