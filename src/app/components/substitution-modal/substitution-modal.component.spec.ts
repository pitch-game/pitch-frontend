import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutionModalComponent } from './substitution-modal.component';

describe('SubstitutionModalComponent', () => {
  let component: SubstitutionModalComponent;
  let fixture: ComponentFixture<SubstitutionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstitutionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstitutionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
