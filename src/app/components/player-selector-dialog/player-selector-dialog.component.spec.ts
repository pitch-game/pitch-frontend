import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectorDialogComponent } from './player-selector-dialog.component';

describe('PlayerSelectorDialogComponent', () => {
  let component: PlayerSelectorDialogComponent;
  let fixture: ComponentFixture<PlayerSelectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSelectorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
