import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEventModalComponent } from './add-event-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddEventModalComponent', () => {
  let component: AddEventModalComponent;
  let fixture: ComponentFixture<AddEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule, AddEventModalComponent, BrowserAnimationsModule],
      providers: [FormBuilder]
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
    component.ngOnInit();
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

  it('should mark title as valid if between 2 and 6 characters', () => {
    const titleControl = component.newEventForm.controls['title'];
    titleControl.setValue('valid');
    expect(titleControl.valid).toBeTruthy();
  });

  it('should mark title as invalid if more than 6 characters', () => {
    const titleControl = component.newEventForm.controls['title'];
    titleControl.setValue('invalidtitle');
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
});
