import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSeasonPage } from './current-season.page';

describe('CurrentSeasonComponent', () => {
  let component: CurrentSeasonPage;
  let fixture: ComponentFixture<CurrentSeasonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSeasonPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSeasonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
