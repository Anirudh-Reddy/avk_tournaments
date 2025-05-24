import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRevealComponent } from './team-reveal.component';

describe('TeamRevealComponent', () => {
  let component: TeamRevealComponent;
  let fixture: ComponentFixture<TeamRevealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRevealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
