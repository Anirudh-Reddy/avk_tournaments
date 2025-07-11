import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Team } from '../../models/team.model';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, TagModule, LoadingComponent],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams = signal<Team[]>([]);
  selectedSport = 'Volleyball';
  expandedTeam = signal<string | null>(null);
  showLoader:boolean = false;

  sports = ['Volleyball', 'Cricket', 'Football'];

  constructor(private api: ApiService, public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.showLoader = true;
    this.api.getTeams().subscribe({
      next: (data) => {
        this.teams.set(data)
        this.showLoader = false;
      },
      error : () => {this.showLoader = false;}
    });
  }

  filteredTeams = computed(() =>
    this.teams().filter(team => team.sport === this.selectedSport)
  );

  filterTeams() {
    this.teams.set([...this.teams()]);
  }

  toggleExpand(teamId: any) {
    this.expandedTeam.set(this.expandedTeam() === teamId ? null : teamId);
    console.log(this.expandedTeam())
  }

  getPlayerImage(playerName: string): string {
    const safeName = playerName.toLowerCase().replace(/ /g, '-');
    // return `players/image.png`;
    return  `players/${playerName}.jpeg`;
  }
}