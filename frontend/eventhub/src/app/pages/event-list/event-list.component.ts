import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserState } from '../../../state/user-state/user.state';
import { UserObj } from '../../models/user';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
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
import { UserAction } from '../../../state/user-state/user.action';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventDetailModalComponent } from '../../modal/event-detail-modal/event-detail-modal.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  providers: [Store],
  imports: [SharedModule, MatButtonModule, MatListModule,MatTabsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  @SelectSnapshot(UserState.getUserData) public userData: UserObj | undefined;
  @SelectSnapshot(EventState.getEventData) public eventDataList: EventObj[] | undefined;
  @SelectSnapshot(EventState.getMyEventData) public eventMyDataList: EventObj[] | undefined;

  readonly dialog = inject(MatDialog);

  constructor(private router: Router, private authService: AuthenticationService, private store: Store, private eventService: EventsService, private dialogService: DialogService, private _snackBar : MatSnackBar) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.dialogService.openDialogMessage("Utente non loggato", "Fai la login");
      this.router.navigate(['/login-page']);
    } else {
      const user = this.authService.getUserLogged();
      this.store.dispatch(new UserAction.SetUserData({id:user.id, email: user.email, password: user.password, username: user.username }));
      this.loadEvents();
    }
  }

  loadEvents() {
    this.eventService.retrieveAllEvents().then(res => {
      this.store.dispatch(new EventAction.SetEventDataList(res));
    });
    this.eventService.retrieveMyEvents().then(res => {
      this.store.dispatch(new EventAction.SetMyAEventDataList(res));
    });
  }

  reloadingMyEvents() {
    this.eventService.retrieveMyEvents();
  }

  reloadingEvents() {
    this.eventService.retrieveAllEvents();
  }

  openDetailModal(event: EventObj) {
    this.dialog.open(EventDetailModalComponent,{data:{event}}).afterClosed().subscribe(res => {
      if (res.success) {
        this.loadEvents();
      }
    });
  }

  goToLoginPage() {
    this.authService.logout();
    this.router.navigate(['/login-page']);
  }

  openModalAdd() {
    this.dialog.open(AddEventModalComponent).afterClosed().subscribe(res => {
      if (res.success) {
        this.loadEvents();
      }
    });
  }

  isMyEvent(item : EventObj){
    let myEvent = this.eventMyDataList?.find(elem => {
      return elem.id == item.id;
    })
    if(myEvent){
      return true;
    }
    else{
      return false;
    }
  }

  partecipa(item : EventObj){
    if(!this.isUserIscritto(item)){
      this.eventService.partecipaEvent(item).then(res =>{
        if(res){
          this._snackBar.open("Ti sei inscritto all'evento "+item.title+"", "OK");
          this.reloadingEvents();
        }
      });
    }
  }

  isUserIscritto(item : EventObj){

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
