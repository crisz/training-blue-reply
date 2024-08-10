import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEventModalComponent } from './add-event-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../services/dialog.service';

describe('AddEventModalComponent', () => {
  let component: AddEventModalComponent;
  let fixture: ComponentFixture<AddEventModalComponent>;
  let dialogRefMock: MatDialogRef<AddEventModalComponent>;
  let eventServiceMock: jest.Mocked<EventsService>;
  let snackBarMock: jest.Mocked<MatSnackBar>;
  let dialogServiceMock: jest.Mocked<DialogService>;

  beforeEach(async () => {
    dialogRefMock = {
      close: jest.fn()
    } as unknown as MatDialogRef<AddEventModalComponent>;

    eventServiceMock = {
      createEvent: jest.fn()
    } as unknown as jest.Mocked<EventsService>;

    snackBarMock = {
      open: jest.fn()
    } as unknown as jest.Mocked<MatSnackBar>;

    dialogServiceMock = {
      openDialogMessage: jest.fn()
    } as unknown as jest.Mocked<DialogService>;

    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AddEventModalComponent
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: EventsService, useValue: eventServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: DialogService, useValue: dialogServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.newEventForm;
    expect(form).toBeTruthy();
    expect(form.controls['title']).toBeTruthy();
    expect(form.controls['description']).toBeTruthy();
    expect(form.controls['place']).toBeTruthy();
  });

  it('should mark title as invalid if empty', () => {
    const titleControl = component.newEventForm.controls['title'];
    titleControl.setValue('');
    expect(titleControl.invalid).toBeTruthy();
  });

  it('should mark title as invalid if less than 2 characters', () => {
    const titleControl = component.newEventForm.controls['title'];
    titleControl.setValue('a');
    expect(titleControl.invalid).toBeTruthy();
  });

  it('should mark title as valid if between 2 and 10 characters', () => {
    const titleControl = component.newEventForm.controls['title'];
    titleControl.setValue('valid');
    expect(titleControl.valid).toBeTruthy();
  });

  it('should mark title as invalid if more than 10 characters', () => {
    const titleControl = component.newEventForm.controls['title'];
    titleControl.setValue('invalidtitleexceeding');
    expect(titleControl.invalid).toBeTruthy();
  });

  it('should mark description as invalid if less than 6 characters', () => {
    const descriptionControl = component.newEventForm.controls['description'];
    descriptionControl.setValue('short');
    expect(descriptionControl.invalid).toBeTruthy();
  });

  it('should mark description as valid if 6 or more characters', () => {
    const descriptionControl = component.newEventForm.controls['description'];
    descriptionControl.setValue('valid description');
    expect(descriptionControl.valid).toBeTruthy();
  });

  it('should mark place as invalid if less than 6 characters', () => {
    const placeControl = component.newEventForm.controls['place'];
    placeControl.setValue('short');
    expect(placeControl.invalid).toBeTruthy();
  });

  it('should mark place as valid if 6 or more characters', () => {
    const placeControl = component.newEventForm.controls['place'];
    placeControl.setValue('valid place');
    expect(placeControl.valid).toBeTruthy();
  });

  // it('should close the dialog with success result on successful event creation', async () => {
  //   // Mock fetch for a successful image retrieval
  //   (window as any).fetch = jest.fn().mockResolvedValue({
  //     ok: true,
  //     blob: () => Promise.resolve(new Blob())
  //   });
  
  //   // Mock the eventService.createEvent to simulate a successful response
  //   eventServiceMock.createEvent.mockResolvedValue({}); // Assuming empty object means success
  
  //   // Set the form values
  //   component.newEventForm.setValue({
  //     title: 'Event Title',
  //     description: 'Event Description',
  //     place: 'Event Place'
  //   });
  
  //   // Call the createEvent function
  //   await component.createEvent(); 
  
  //   // Wait for asynchronous operations to complete
  //   await fixture.whenStable(); 
  
  //   // Check if dialogRef.close was called with the success result
  //   expect(dialogRefMock.close).toHaveBeenCalledWith({ success: true });
  
  //   // Check if snackbar was opened with the success message
  //   expect(snackBarMock.open).toHaveBeenCalledWith('Create event is Success', 'OK');
  // });

  it('should close the dialog with failure result on event creation error', async () => {
    eventServiceMock.createEvent.mockRejectedValue('Error');
    component.createEvent();
    await fixture.whenStable();
    expect(dialogRefMock.close).toHaveBeenCalledWith({ success: false });
    expect(dialogServiceMock.openDialogMessage).toHaveBeenCalledWith('Errore', 'Errore durante il processo di creazione evento');
  });

  it('should close the dialog with failure result if form is invalid', () => {
    component.newEventForm.controls['title'].setValue('');
    component.createEvent();
    expect(dialogRefMock.close).toHaveBeenCalledWith({ success: false });
    expect(dialogServiceMock.openDialogMessage).toHaveBeenCalledWith('Errore', 'Errore durante il processo di creazione evento');
  });
});
