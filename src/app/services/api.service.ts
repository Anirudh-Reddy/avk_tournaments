import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Team } from '../models/team.model';
import { Match } from '../models/match.model';
import { Announcement } from '../models/announcement.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // Teams
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams`);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/teams`, team);
  }

  updateTeamPoints(id: string, points: number): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/teams/${id}/points`, { points });
  }

  // Matches
  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/matches`);
  }

  createMatch(match: any): Observable<Match> {
    return this.http.post<Match>(`${this.baseUrl}/matches`, match);
  }

  updateMatchScore(id: string, scoreA: number, scoreB: number, status: string): Observable<Match> {
    return this.http.put<Match>(`${this.baseUrl}/matches/${id}/score`, { scoreA, scoreB, status });
  }

  // Announcements
  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseUrl}/announcements`);
  }

  createAnnouncement(data: Partial<Announcement>): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.baseUrl}/announcements`, data);
  }

  uploadPhoto(photo: { image: string; caption: string }) {
    return this.http.post(`${this.baseUrl}/photos`, photo);
  }

  getPhotos() {
    return this.http.get<any[]>(`${this.baseUrl}/photos`);
  }

}
