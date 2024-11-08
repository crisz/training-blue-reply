import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogModalComponent, DialogData } from './dialog-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogModalComponent', () => {
  let component: DialogModalComponent;
  let fixture: ComponentFixture<DialogModalComponent>;

  const dialogData: DialogData = {
    title: 'Test Title',
    subtitle: 'Test Subtitle'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogModalComponent, MatDialogModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
