import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { SocketService } from '../../services/socket.service';
import { Match } from '../../models/match.model';
import { TabViewModule } from 'primeng/tabview';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-live-score',
  standalone: true,
  imports: [CommonModule, TabViewModule, LoadingComponent],
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.scss']
})
export class LiveScoreComponent implements OnInit {
  matches = signal<Match[]>([]);
  showLoader= false
  ongoingMatches = computed(() =>
    this.matches().filter(m => m.status === 'Ongoing')
  );

  scheduledMatches = computed(() =>
    this.matches().filter(m => m.status === 'Scheduled')
  );

  completedMatches = computed(() =>
    this.matches().filter(m => m.status === 'Completed')
  );

  cancelledMatches = computed(() =>
    this.matches().filter(m => m.status === 'Cancelled')
  );

  constructor(
    private api: ApiService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.showLoader = true
    this.api.getMatches().subscribe((data) => {this.matches.set(data)
      this.showLoader = false
    });

    this.socketService.onScoreUpdate((updatedMatch: Match) => {
      const updated = this.matches().map(m =>
        m._id === updatedMatch._id ? updatedMatch : m
      );
      this.matches.set(updated);
    });
  }

  formatDate(date: any): string {
    const d = new Date(date);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = String(d.getDate()).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${month}-${day}-${year}`;
  }

  formatTime(date: any): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }
}
