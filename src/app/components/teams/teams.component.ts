import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Team } from '../../models/team.model';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, TagModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams = signal<Team[]>([]);
  selectedSport = 'Volleyball';
  expandedTeam = signal<string | null>(null);


  sports = ['Volleyball', 'Cricket', 'Football'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getTeams().subscribe((data) => this.teams.set(data));
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

}