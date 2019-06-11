import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToOpenComponent } from './open.page';

describe('ReadyToOpenComponent', () => {
  let component: ReadyToOpenComponent;
  let fixture: ComponentFixture<ReadyToOpenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyToOpenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyToOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
