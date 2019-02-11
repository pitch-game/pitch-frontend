import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesComponent } from './challenges.page';

describe('ChallengesComponent', () => {
  let component: ChallengesComponent;
  let fixture: ComponentFixture<ChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
