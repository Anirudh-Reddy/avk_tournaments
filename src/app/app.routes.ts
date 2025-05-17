import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LiveScoreComponent } from './components/live-score/live-score.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'live-score', component: LiveScoreComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotFoundComponent } // catch-all
];
