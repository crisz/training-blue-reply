import { Component } from '@angular/core';
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
export class AddEventModalComponent {

  newEventForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,private eventService: EventsService, private _snackBar : MatSnackBar,private dialogService: DialogService,public dialogRef: MatDialogRef<AddEventModalComponent> ){

  }

  ngOnInit(){
    this.newEventForm = this.fb.group({
			title: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(10)]],
			description: ['', [Validators.required, Validators.minLength(6)]],
      place: ['', [Validators.required, Validators.minLength(6)]]
		});
  }

  createEvent(): void {
    if (this.newEventForm.valid) {
      const eventData = this.newEventForm.value;
      this.eventService.createEvent(eventData)
        .then(response => {
          this._snackBar.open("Create event is Success", "OK");
          this.dialogRef.close({success:true});
        })
        .catch(error => {
          this.dialogService.openDialogMessage("Errore","Errore durante il processo di creazione evento");
          this.dialogRef.close({success:false});
        });
    } else {
      this.dialogService.openDialogMessage("Errore","Errore durante il processo di creazione evento");
      this.dialogRef.close({success:false});
    }
  }
}
