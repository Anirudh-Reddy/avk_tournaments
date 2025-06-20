import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-team-reveal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-reveal.component.html',
  styleUrls: ['./team-reveal.component.scss']
})
export class TeamRevealComponent implements OnDestroy{
  activeTeamIndex: number | null = null;
  revealedPlayerCount: number = 0;

  teamList = {
    'Team 1' : [
      {name:'Harshal Patil', image:'players/Harshal Patil.jpeg'},
      {name:'Aishwarya', image:'players/Aishwarya.jpeg'},
      {name:'Kalyan Muddapu', image:'players/Kalyan Muddapu.jpg'},
      {name:'Avinash Betha', image:'players/Avinash Betha.jpeg'}
    ],
    'Team 2':[
      {name:'Jay', image:'players/Jay.jpeg'},
      {name:'Naveen', image:'players/Naveen.jpeg'},
      {name:'Venkata Kalidindi', image:'players/Venkata Kalidindi.jpeg'},
      {name:'Santhosh Rajesndran', image:'players/Santhosh Rajesndran.jpeg'}
    ],
    'Team 3':[     
      {name:'Praveen Vuduthuri', image:'players/Praveen Vuduthuri.jpeg'},
      {name:'Prathap Alluri', image:'players/Prathap Alluri.jpg'},
      {name:'Praveen Cherukuri', image:'players/Praveen Cherukuri.jpeg'},
      {name:'Chenna Malireddy', image:'players/Chenna Malireddy.jpeg'}
    ],
    'Team 4':[     
      {name:'Rohit Suluguri', image:'players/Rohit Suluguri.jpg'},
      {name:'Aryan', image:'players/Aryan.jpeg'},
      {name:'Vijaya Kumar Pammina', image:'players/Vijaya Kumar Pammina.jpeg'},
      {name:'Nitin', image:'players/Nitin.jpeg'}
    ],
    'Team 5':[    
      {name:'Sailesh Kanteti', image:'players/Sailesh Kanteti.jpeg'},
      {name:'Pradeep Atmuri', image:'players/Pradeep Atmuri.jpeg'},
      {name:'Anirudh Reddy Goli', image: 'players/Anirudh Reddy Goli.jpeg'},
      {name:'Bhargava Mandipati', image:'players/Bhargava Mandipati.jpeg'}
    ]
  }

  teams = [
    { name: 'Team 1', players: this.teamList['Team 1'] },
    { name: 'Team 2', players: this.teamList['Team 2'] },
    { name: 'Team 3', players: this.teamList['Team 3'] },
    { name: 'Team 4', players: this.teamList['Team 4'] },
    { name: 'Team 5', players: this.teamList['Team 5'] }
  ];

  generateTeam(seed: number) {

    



    return Array.from({ length: 4 }, (_, i) => ({
      name: `Player ${seed}${i + 1}`,
      image: `https://i.pravatar.cc/150?img=${seed * 5 + i}`
    }));
  }

  // revealTeam(index: number) {
  //   this.activeTeamIndex = index;
  //   this.revealedPlayerCount = 0;

  //   // Stop all other audios
  //   const allAudios = document.querySelectorAll('audio') as NodeListOf<HTMLAudioElement>;
  //   allAudios.forEach(audio => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   });

  //   const audio = document.getElementById(`bgm-${index+1}`) as HTMLAudioElement;
  //   if (audio) {
  //     audio.currentTime = 0;
  //     audio.loop = true;
  //     audio.play();
  //   }

  //   this.launchConfetti();

  //   // Confetti every 3s
  //   const confettiInterval = setInterval(() => {
  //     if (this.activeTeamIndex !== index) {
  //       clearInterval(confettiInterval);
  //     } else {
  //       this.launchConfetti();
  //     }
  //   }, 3000);

  //   // Reveal players one by one with random delay
  //   const totalPlayers = this.teams[index].players.length;
  //   let accumulatedDelay = 0;

  //   for (let i = 0; i < totalPlayers; i++) {
  //     const delay = 3000; // 3000–5000ms
  //     accumulatedDelay += delay;

  //     setTimeout(() => {
  //       if (this.activeTeamIndex === index) {
  //         this.revealedPlayerCount = i + 1;
  //       }
  //     }, accumulatedDelay);
  //   }
  // }

 revealTeam(index: number) {
  this.activeTeamIndex = index;
  this.revealedPlayerCount = 0;

  // Stop all audios
  const allAudios = document.querySelectorAll('audio') as NodeListOf<HTMLAudioElement>;
  allAudios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  const audio = document.getElementById(`bgm-${index + 1}`) as HTMLAudioElement;
  if (audio) {
    audio.currentTime = 0;
    audio.loop = true;
    audio.play();
  }

  const totalPlayers = this.teams[index].players.length;
  let accumulatedDelay = 0;

  // Confetti bursts during reveal
  const confettiDuringReveal = setInterval(() => {
    if (this.revealedPlayerCount >= totalPlayers || this.activeTeamIndex !== index) {
      clearInterval(confettiDuringReveal);
    } else {
      this.launchConfetti(); // High energy burst
    }
  }, 3000);

  // Reveal players one by one every 3s
  for (let i = 0; i < totalPlayers; i++) {
    accumulatedDelay += 3000;

    setTimeout(() => {
      if (this.activeTeamIndex === index) {
        this.revealedPlayerCount = i + 1;

        // When last player is revealed, start soft confetti
        if (this.revealedPlayerCount === totalPlayers) {
          this.startSoftConfetti(index);
        }
      }
    }, accumulatedDelay);
  }
}

softConfettiInterval: any;

startSoftConfetti(index: number) {
  if (this.softConfettiInterval) {
    clearInterval(this.softConfettiInterval);
  }

  this.softConfettiInterval = setInterval(() => {
    if (this.activeTeamIndex !== index) {
      clearInterval(this.softConfettiInterval);
      return;
    }

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });
  }, 3000); // every 7s
}



  launchConfetti() {
    
    this.launchFireworksStyleConfetti();
  }

  launchFireworksStyleConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const x = Math.random();
    const y = Math.random() * 0.5;

    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x, y },
    });

    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 - x, y },
    });
  }, 250);
}

ngOnDestroy() {
  if (this.softConfettiInterval) {
    clearInterval(this.softConfettiInterval);
  }
}

}
