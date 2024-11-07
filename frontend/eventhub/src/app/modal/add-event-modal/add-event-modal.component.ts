import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EventsService } from '../../services/events.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-event-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.scss'
})
export class AddEventModalComponent implements OnInit {

  newEventForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventsService,
    private _snackBar: MatSnackBar,
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<AddEventModalComponent>
  ) {}

  ngOnInit() {
    this.newEventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(6)]],
      place: ['', [Validators.required, Validators.minLength(6)]],
      file: [null, Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Non impostare il valore dell'input file direttamente
      this.newEventForm.patchValue({ file: this.selectedFile });

      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  //funzione per creare l'evento 
  createEvent(): void {
    if (this.newEventForm.valid) {
      const eventData = new FormData();
      eventData.append('title', this.newEventForm.get('title')?.value);
      eventData.append('description', this.newEventForm.get('description')?.value);
      eventData.append('place', this.newEventForm.get('place')?.value);
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
         // Convert File to Blob
        const blob = new Blob([this.selectedFile], { type: this.selectedFile.type });
        eventData.append('image', blob,this.selectedFile.name);
      }
      this.eventService.createEvent(eventData)
        .then(response => {
          this._snackBar.open("Create event is Success", "OK");
          this.dialogRef.close({ success: true });
        })
        .catch(error => {
          this.dialogService.openDialogMessage("Errore", "Errore durante il processo di creazione evento");
          this.dialogRef.close({ success: false });
        });
    } else {
      this.dialogService.openDialogMessage("Errore", "Errore durante il processo di creazione evento");
      this.dialogRef.close({ success: false });
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.filePreview = null;
    this.newEventForm.patchValue({ file: null });
  }
}
