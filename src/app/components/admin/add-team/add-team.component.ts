import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent {
  team = {
    name: '',
    sport: '',
    players: [] as string[],
    points:0
  };

  newPlayer = '';

  constructor(private api: ApiService) {}

  addPlayer() {
    if (this.newPlayer.trim()) {
      this.team.players.push(this.newPlayer.trim());
      this.newPlayer = '';
    }
  }

  removePlayer(player: string) {
    this.team.players = this.team.players.filter(p => p !== player);
  }

  submitTeam() {
    this.api.createTeam(this.team).subscribe(() => {
      this.team = { name: '', sport: '', players: [], points: 0 };
    });
  }
  
}
