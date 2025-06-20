import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Announcement } from '../../models/announcement.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  private allAnnouncements = signal<Announcement[]>([]);
  announcements = computed(() => this.allAnnouncements().slice().reverse());

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAnnouncements().subscribe(data => {
      let reverseArry = data.reverse();
      console.log('reverseArry " ',reverseArry)
      this.allAnnouncements.set(reverseArry);
    });
  }

  formatMessage(message: string | null | undefined): string {
    if (!message) return '';
    return message
      .replace(/(?:\r\n|\r|\n)/g, '<br>')  // preserve line breaks
      .replace(/ {2}/g, '&nbsp;&nbsp;');   // preserve multiple spaces
  }

  formatSubheader(date: string | null | undefined): string | undefined {
    if (!date) return undefined;
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate.toLocaleString();
  }

  getSportColor(sport: string): string {
    switch (sport) {
      case 'Volleyball': return '#f97316';
      case 'Cricket': return '#10b981';
      case 'Football': return '#3b82f6';
      case 'Badminton': return '#8b5cf6';
      default: return '#6b7280';
    }
}

}
