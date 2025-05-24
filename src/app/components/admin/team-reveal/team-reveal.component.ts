import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-team-reveal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-reveal.component.html',
  styleUrls: ['./team-reveal.component.scss']
})
export class TeamRevealComponent {
  activeTeamIndex: number | null = null;
  revealedPlayerCount: number = 0;

  teams = [
    { name: 'Team Inferno', players: this.generateTeam(1) },
    { name: 'Team Thunder', players: this.generateTeam(2) },
    { name: 'Team Titans', players: this.generateTeam(3) },
    { name: 'Team Blaze', players: this.generateTeam(4) },
    { name: 'Team Storm', players: this.generateTeam(5) }
  ];

  generateTeam(seed: number) {
    return Array.from({ length: 4 }, (_, i) => ({
      name: `Player ${seed}${i + 1}`,
      image: `https://i.pravatar.cc/150?img=${seed * 5 + i}`
    }));
  }

  revealTeam(index: number) {
    this.activeTeamIndex = index;
    this.revealedPlayerCount = 0;

    const audio = document.getElementById(`bgm-${index}`) as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }

    this.launchConfetti();

    // Confetti every 3s
    const confettiInterval = setInterval(() => {
      if (this.activeTeamIndex !== index) {
        clearInterval(confettiInterval);
      } else {
        this.launchConfetti();
      }
    }, 3000);

    // Reveal players one by one with random delay
    const totalPlayers = this.teams[index].players.length;
    let accumulatedDelay = 0;

    for (let i = 0; i < totalPlayers; i++) {
      const delay = 3000; // 3000–5000ms
      accumulatedDelay += delay;

      setTimeout(() => {
        if (this.activeTeamIndex === index) {
          this.revealedPlayerCount = i + 1;
        }
      }, accumulatedDelay);
    }
  }

  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 }
    });
  }
}
