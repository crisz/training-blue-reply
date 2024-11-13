import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../../models/event';
import { EventsService } from '../../services/events.service';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { UserState } from '../../../state/user-state/user.state';
import { UserObj } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventAction } from '../../../state/event-state/event.action';
import {  Store } from '@ngxs/store';

@Component({
  selector: 'app-event-detail-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './event-detail-modal.component.html',
  styleUrl: './event-detail-modal.component.scss'
})

export class EventDetailModalComponent {

  @SelectSnapshot(UserState.getUserData) public userData: UserObj | undefined;

  public event: Event | undefined;
  public imageEvent: string | undefined;

  constructor(private store : Store ,@Inject(MAT_DIALOG_DATA) public data: { event: Event },private eventService: EventsService,private _snackBar : MatSnackBar,public dialogRef: MatDialogRef<EventDetailModalComponent>) {}

  ngOnInit(){
    this.event = this.data.event;
    this.imageEvent = this.event.imageUrl;
  }

  participate(item: Event){
    this.store.dispatch(new EventAction.EventParticipate(item)).subscribe(elem =>{
      this.closeModal();
    });
  }

  removeParticipation(item: Event){
    this.store.dispatch(new EventAction.RemoveParticipate(item)).subscribe(elem =>{
      this.closeModal();
    });;
  }

  closeModal(){
    this.dialogRef.close({ success: true });
  }

  public isUserRegistered(item: Event): boolean {
    return !!item.participantIds?.find(elem => {
      return elem === this.userData?.id;
    })
  }

}
