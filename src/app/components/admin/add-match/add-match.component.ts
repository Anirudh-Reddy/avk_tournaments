import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Team } from '../../../models/team.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-add-match',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss']
})
export class AddMatchComponent implements OnInit {
  form = this.fb.group<{
  teamA: Team | null;
  teamB: Team | null;
  date: Date | null;
  sport: string | null;
  status: string | null;
  scoreA: number;
  scoreB: number;
  }>({
    teamA: null,
    teamB: null,
    date: null,
    sport: 'Volleyball',
    status: 'Scheduled',
    scoreA: 0,
    scoreB: 0
  });


  teams: Team[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: MessageService
  ) {}

  ngOnInit(): void {
    this.api.getTeams().subscribe((data:any) => {
      this.teams = data;
    });
  }

  submit() {
    const formValue = this.form.value;

    if (
      this.form.valid &&
      formValue.teamA?.['_id'] &&
      formValue.teamB?.['_id']
    ) {
      const match = {
        teamA: formValue.teamA.name,
        teamB: formValue.teamB.name,
        date: formValue.date!,
        sport: formValue.sport!,
        status: formValue.status!,
        scoreA: formValue.scoreA ?? 0,
        scoreB: formValue.scoreB ?? 0
      };

      this.api.createMatch(match).subscribe(() => {
        this.toast.add({ severity: 'success', summary: 'Match Added', detail: 'New match has been scheduled' });
        this.form.reset();
        this.form.patchValue({ sport: 'Volleyball', status: 'Scheduled', scoreA: 0, scoreB: 0 });
      });
    }
  }

}
