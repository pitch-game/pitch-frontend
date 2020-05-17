import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchLineupPlayerCardComponent } from './match-lineup-player-card.component';

describe('MatchLineupPlayerCardComponent', () => {
  let component: MatchLineupPlayerCardComponent;
  let fixture: ComponentFixture<MatchLineupPlayerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchLineupPlayerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchLineupPlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
