import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, Routes } from '@angular/router';
import { UserState } from '../../../state/user-state/user.state';
import { UserObj } from '../../models/user';
import { NgxsSelectSnapshotModule, SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { SharedModule } from '../../shared/shared.module';
import { Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { EventsService } from '../../services/events.service';
import { MatListModule } from '@angular/material/list';
import { EventAction } from '../../../state/event-state/event.action';
import { EventObj } from '../../models/event';
import { EventState } from '../../../state/event-state/event.state';
import { DialogService } from '../../services/dialog.service';
import { AddEventModalComponent } from '../../modal/add-event-modal/add-event-modal.component';
import { AuthenticationService } from '../../services/authentication.service';



@Component({
  selector: 'app-event-list',
  standalone: true,
  providers: [Store],
  imports: [SharedModule,MatButtonModule,MatListModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  @SelectSnapshot(UserState.getUserData) public userData: UserObj | undefined; // ritorna il correlation id
  @SelectSnapshot(EventState.getEventData) public eventDataList: EventObj[] | undefined; // ritorna il correlation id
  
  readonly dialog = inject(MatDialog);

  constructor(private router: Router, private authService: AuthenticationService,private store: Store, private eventService: EventsService,private dialogService: DialogService){

  }

  ngOnInit(){
    if(!this.authService.isLoggedIn()){
      this.dialogService.openDialogMessage("Utente non loggato","Fai la login");
      this.router.navigate(['/login-page']);
    }
    else{
      this.eventService.retrieveEvents().then(res => {
        this.store.dispatch(new EventAction.SetEventDataList([{id: "1", description :"ciao", title :"event1",place:"ciao",image:"ciao"},{id: "1", description :"ciao", title :"event2",place:"ciao",image:"ciao"}])); //mock
      }); //da leggere gli eventi dal servizio
    }
    console.log(this.store);
  }

  openDescription(description:string){
    this.dialogService.openDialogMessage(description,"La descrizione dell' "+description+"");
  }

  goToLoginPage(){
    this.authService.logout();
    this.router.navigate(['/login-page']);
  }

  openModalAdd(){
    this.eventService.createEvent();
    this.dialog.open(AddEventModalComponent);
  }
}

