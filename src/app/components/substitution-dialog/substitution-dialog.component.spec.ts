import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutionDialogComponent } from './substitution-dialog.component';

describe('SubstitutionDialogComponent', () => {
  let component: SubstitutionDialogComponent;
  let fixture: ComponentFixture<SubstitutionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstitutionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstitutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
