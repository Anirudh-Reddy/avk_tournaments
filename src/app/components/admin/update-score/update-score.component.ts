import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Match } from '../../../models/match.model';
import { ApiService } from '../../../services/api.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-update-score',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './update-score.component.html',
  styleUrls: ['./update-score.component.scss']
})
export class UpdateScoreComponent implements OnInit {
  matches = signal<Match[]>([]);
  filteredMatches = signal<Match[]>([]);
  selectedMatch: Match | null = null;

  sports = ['Volleyball', 'Cricket', 'Football'];
  selectedSport = 'Volleyball';

  constructor(
    private api: ApiService,
    private socket: SocketService,
    private toast: MessageService
  ) {}

  ngOnInit(): void {
    this.api.getMatches().subscribe(data => {
      const labeledMatches = data.map(match => ({
        ...match,
        label: `${this.getName(match.teamA)} vs ${this.getName(match.teamB)} | ${this.formatDate(match.date)} | ${match.status}`
      }));

      this.matches.set(labeledMatches);
      this.filterMatches(); // initial filtering
    });
  }

  filterMatches() {
    const filtered = this.matches().filter(match => match.sport === this.selectedSport);
    this.filteredMatches.set(filtered);
  }

  formatDate(date: any): string {
    const newDate = new Date(date);
    const month = newDate.toLocaleString('en-US', { month: 'short' });
    const day = String(newDate.getDate()).padStart(2, '0');
    const year = newDate.getFullYear();
    return `${month} ${day} ${year}`;
  }

  getName(team: any): string {
    return typeof team === 'string' ? team : team.name;
  }

  onSelect(match: Match) {
    this.selectedMatch = { ...match }; // avoid mutating the original object
  }

  updateScore() {
    if (this.selectedMatch && this.selectedMatch._id) {
      const { _id, scoreA, scoreB, status } = this.selectedMatch;

      this.api.updateMatchScore(_id, scoreA ?? 0, scoreB ?? 0, status).subscribe(updated => {
        this.toast.add({
          severity: 'success',
          summary: 'Score Updated',
          detail: `Match between ${this.getName(updated.teamA)} and ${this.getName(updated.teamB)} updated`
        });

        this.socket.emitScoreUpdate(updated);
        this.selectedMatch = null;
        this.filterMatches(); // refresh filtered list
      });
    }
  }
}
