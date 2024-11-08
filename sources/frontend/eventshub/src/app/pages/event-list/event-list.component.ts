import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserState } from '../../../state/user-state/user.state';
import { UserObj } from '../../models/user';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { SharedModule } from '../../shared/shared.module';
import { Select, Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { EventAction } from '../../../state/event-state/event.action';
import { Event } from '../../models/event';
import { EventState } from '../../../state/event-state/event.state';
import { DialogService } from '../../services/dialog.service';
import { AddEventModalComponent } from '../../modal/add-event-modal/add-event-modal.component';
import { AuthenticationService } from '../../services/authentication.service';
import { UserAction } from '../../../state/user-state/user.action';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventDetailModalComponent } from '../../modal/event-detail-modal/event-detail-modal.component';
import { filter } from 'rxjs/operators';
import { EventsService } from '../../services/events.service';
import { Observable } from 'rxjs';

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
  @Select(EventState.getEventData) public eventDataList!: Observable<Event[] | undefined>;
  @SelectSnapshot(EventState.getMyEventData) public eventMyDataList: Event[] | undefined;

  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly authService = inject(AuthenticationService);
  readonly store = inject(Store);
  readonly dialogService = inject(DialogService);
  public isLoading: boolean = false;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    const user = this.authService.getUserLogged();
    this.store.dispatch(new UserAction.SetUserData({id:user.id, email: user.email, password: user.password, username: user.username }));
    this.loadEvents();
  }

  loadEvents() {
    this.store.dispatch(new EventAction.FetchEvents);
    this.store.dispatch(new EventAction.FetchMyEvents);
  }

  reloadMyEvents() {
    this.store.dispatch(new EventAction.FetchMyEvents);
  }

  reloadAllEvents() {
    this.store.dispatch(new EventAction.FetchEvents)
  }

  openDetailModal(event: Event) {
    this.dialog.open(EventDetailModalComponent,{data:{event}}).afterClosed().subscribe(res => {
      if (res?.success) {
        this.loadEvents();
      }
    });
  }

  goToLoginPage() {
    this.authService.logout();
    this.router.navigate(['/login-page']);
  }

  openModalAdd() {
    this.dialog.open(AddEventModalComponent)
      .afterClosed()
      .pipe(filter(res => res?.success))
      .subscribe(() => {
        this.loadEvents();
    });
  }

  // TODO: to utils
  public isUserRegistered(item: Event): boolean {
    return !!item.participantIds?.find(elem => {
      return elem === this.userData?.id;
    })
  }

  participate(item: Event){
    this.eventsService.eventParticipate(item);
  }

  removeParticipation(item: Event){
    this.eventsService.eventRemoveParticipation(item);
  }
}
