import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventObj } from '../../models/event';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-detail-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './event-detail-modal.component.html',
  styleUrl: './event-detail-modal.component.scss'
})

export class EventDetailModalComponent {

  public event : EventObj | undefined;
  public imageEvent: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: EventObj },private eventService: EventsService) {}

  ngOnInit(){
    this.event = this.data.event;  
    this.eventService.getEventImage(this.event.imageUrl).then(response =>{
      this.imageEvent = URL.createObjectURL(response);
    })
  }

}
