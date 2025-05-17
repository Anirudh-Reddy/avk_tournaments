import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Announcement } from '../../models/announcement.model';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  announcements = signal<Announcement[]>([]);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAnnouncements().subscribe((data) => {
      this.announcements.set(data);
    });
  }
}
