import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  photos = signal<any[]>([]);
  selectedImage: any = null;
  showLoader = false
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.showLoader = true
    this.api.getPhotos().subscribe({
      next: (data) => {
        this.photos.set(data)
        this.showLoader = false
      }, error:()=>{
        this.showLoader = false
      }
    });
  }

  openImage(photo: any) {
    this.selectedImage = photo;
  }
}
