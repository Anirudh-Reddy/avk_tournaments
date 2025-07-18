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
  showLoader = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.showLoader = true;
    this.api.getMatches().subscribe({
      next: data => {
        this.matches.set(data);
        this.showLoader = false;
      },
      error: () => {
        this.showLoader = false;
      }
    });
  }

  filteredMatches = computed(() =>
    this.matches().filter(
      m => m.status === 'Completed' && m.sport === this.selectedSport
    )
  );

  teamScores = computed(() => {
    const teamStats: Record<string, {
      wins: number;
      losses: number;
      matches: number;
      totalScore: number;
      points: number;
    }> = {};

    this.filteredMatches().forEach(match => {
      const teamA = typeof match.teamA === 'string' ? match.teamA : match.teamA.name;
      const teamB = typeof match.teamB === 'string' ? match.teamB : match.teamB.name;

      const init = { wins: 0, losses: 0, matches: 0, totalScore: 0, points: 0 };
      teamStats[teamA] = teamStats[teamA] || { ...init };
      teamStats[teamB] = teamStats[teamB] || { ...init };

      // Update match count
      teamStats[teamA].matches += 1;
      teamStats[teamB].matches += 1;

      // Update total scores
      teamStats[teamA].totalScore += match.scoreA;
      teamStats[teamB].totalScore += match.scoreB;

      if (match.scoreA > match.scoreB) {
        teamStats[teamA].wins += 1;
        teamStats[teamB].losses += 1;
        teamStats[teamA].points += 2;
      } else if (match.scoreB > match.scoreA) {
        teamStats[teamB].wins += 1;
        teamStats[teamA].losses += 1;
        teamStats[teamB].points += 2;
      } else {
        teamStats[teamA].points += 1;
        teamStats[teamB].points += 1;
      }
    });

    return Object.entries(teamStats)
      .map(([team, stats]) => ({
        team,
        ...stats,
        averageScore: stats.matches ? stats.totalScore / stats.matches : 0
      }))
      .sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        return b.averageScore - a.averageScore;
      });
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
