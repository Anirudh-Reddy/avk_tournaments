import { Team } from "./team.model";

export interface Match {
  _id?: string;
  teamA: Team | string; // string when referencing by ID, Team when populated
  teamB: Team | string;
  scoreA: number;
  scoreB: number;
  date: string; // ISO date
  sport: string;
  status: 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled';
  createdAt?: string;
  updatedAt?: string;
}
