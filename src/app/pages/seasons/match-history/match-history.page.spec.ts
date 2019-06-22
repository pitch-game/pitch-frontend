import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchHistoryPage } from './match-history.page';

describe('MatchHistoryComponent', () => {
  let component: MatchHistoryPage;
  let fixture: ComponentFixture<MatchHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchHistoryPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
