import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-add-event-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.scss'
})
export class AddEventModalComponent {

  newEventForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.newEventForm = this.fb.group({
			title: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(6)]],
			description: ['', [Validators.required, Validators.minLength(6)]],
      place: ['', [Validators.required, Validators.minLength(6)]]
		});
  }
}
