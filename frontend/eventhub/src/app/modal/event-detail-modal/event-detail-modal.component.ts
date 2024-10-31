import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../../models/event';
import { EventsService } from '../../services/events.service';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { UserState } from '../../../state/user-state/user.state';
import { UserObj } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-detail-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './event-detail-modal.component.html',
  styleUrl: './event-detail-modal.component.scss'
})

export class EventDetailModalComponent {

  @SelectSnapshot(UserState.getUserData) public userData: UserObj | undefined;

  public event : Event | undefined;
  public imageEvent: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: Event },private eventService: EventsService,private _snackBar : MatSnackBar,public dialogRef: MatDialogRef<EventDetailModalComponent>) {}

  ngOnInit(){
    this.event = this.data.event;  
    this.eventService.getEventImage(this.event.imageUrl).then(response =>{
      this.imageEvent = URL.createObjectURL(response);
    })
  }

  partecipate(item : Event){
    //if(!this.isUserRegistered(item)){
      this.eventService.eventPartecipate(item).then(res =>{
        if(res){
          this._snackBar.open("Ti sei inscritto all'evento "+item.title+"", "OK");
          this.closeModal();
        }
      });
    //}
  }

  closeModal(){
    this.dialogRef.close({ success: true });
  }

  isUserRegistered(item : Event){
    let myEvent = item.participantIds?.find(elem => {
      return elem == this.userData?.id;
    })
    if(myEvent){
      return true;
    }
    else{
      return false;
    }
  }

}
