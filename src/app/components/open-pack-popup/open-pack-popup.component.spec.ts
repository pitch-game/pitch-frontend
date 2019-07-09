import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPackPopupComponent } from './open-pack-popup.component';

describe('OpenPackPopupComponentComponent', () => {
  let component: OpenPackPopupComponent;
  let fixture: ComponentFixture<OpenPackPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPackPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPackPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
