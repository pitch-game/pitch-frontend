import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivesquadComponent } from './active-squad.component';

describe('ActivesquadComponent', () => {
  let component: ActivesquadComponent;
  let fixture: ComponentFixture<ActivesquadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivesquadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivesquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
