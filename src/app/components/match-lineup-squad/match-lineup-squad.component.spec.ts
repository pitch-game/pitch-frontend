import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchLineupSquadComponent } from './match-lineup-squad.component';

describe('MatchLineupSquadComponent', () => {
  let component: MatchLineupSquadComponent;
  let fixture: ComponentFixture<MatchLineupSquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchLineupSquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchLineupSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
