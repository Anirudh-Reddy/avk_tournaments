import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Match } from '../../models/match.model';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, CardModule, LoadingComponent],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  matches = signal<Match[]>([]);
  showLoader:boolean = false
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.showLoader = true
    this.api.getMatches().subscribe({
      next: (data) => {
      this.matches.set(data);
      this.showLoader = false
    }, error:()=>{
      this.showLoader = false
    }
    });
  }

  getTeamName(team: string | { name: string }): string {
    console.log('tem :',team)
    return typeof team !== 'string' ? 'Team' : team;
  }
}
