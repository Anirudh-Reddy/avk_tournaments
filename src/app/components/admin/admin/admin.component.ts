import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { AddTeamComponent } from '../add-team/add-team.component';
import { AddMatchComponent } from '../add-match/add-match.component';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';
import { UpdateScoreComponent } from '../update-score/update-score.component';
import { TeamRevealComponent } from '../team-reveal/team-reveal.component';
import { UploadPhotoComponent } from "../upload-photo/upload-photo.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    AddTeamComponent,
    AddMatchComponent,
    AddAnnouncementComponent,
    UpdateScoreComponent,
    TeamRevealComponent,
    UploadPhotoComponent,
    UploadPhotoComponent
],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {}
