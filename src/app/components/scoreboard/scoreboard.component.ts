import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Match } from '../../models/match.model';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DropdownModule,
    TagModule,
    ButtonModule,
    LoadingComponent
  ],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  matches = signal<Match[]>([]);
  selectedSport = 'Volleyball';
  viewMode: 'scoreboard' | 'summary' = 'scoreboard';
  sports = ['Volleyball', 'Cricket', 'Football'];
  showLoader=false;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.showLoader = true;
    this.api.getMatches().subscribe({
      next: data => {this.matches.set(data)
        this.showLoader = false
      }, error :()=>{this.showLoader = false}
    });
  }

  filteredMatches = computed(() =>
    this.matches().filter(
      m => m.status === 'Completed' && m.sport === this.selectedSport
    )
  );

  // Scoreboard table: Aggregated points per team
teamScores = computed(() => {
  const pointsMap: Record<string, number> = {};

  this.filteredMatches().forEach(match => {
    const teamA = typeof match.teamA === 'string' ? match.teamA : match.teamA.name;
    const teamB = typeof match.teamB === 'string' ? match.teamB : match.teamB.name;

    if (!pointsMap[teamA]) pointsMap[teamA] = 0;
    if (!pointsMap[teamB]) pointsMap[teamB] = 0;

    if (match.scoreA > match.scoreB) {
      pointsMap[teamA] += 2;
    } else if (match.scoreB > match.scoreA) {
      pointsMap[teamB] += 2;
    } else {
      pointsMap[teamA] += 1;
      pointsMap[teamB] += 1;
    }
  });

  // 🔽 Sort by points descending
  return Object.entries(pointsMap)
    .map(([team, points]) => ({ team, points }))
    .sort((a, b) => b.points - a.points);
});



  filterMatches() {
    this.matches.set([...this.matches()]);
  }

  formatDate(date: any): string {
    const d = new Date(date);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = String(d.getDate()).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${month}-${day}-${year}`;
  }
}
