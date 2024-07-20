import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, Routes } from '@angular/router';
import { UserState } from '../../../state/user.state';
import { UserObj } from '../../models/user';
import { NgxsSelectSnapshotModule, SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { SharedModule } from '../../shared/shared.module';
import { Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from '../../modal/dialog-modal/dialog-modal.component';
import { EventsService } from '../../services/events.service';
import { MatListModule } from '@angular/material/list';

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
  readonly dialog = inject(MatDialog);
  
  constructor(private router: Router, private httpClient: HttpClient,private store: Store, private eventService: EventsService){

  }

  ngOnInit(){
    if(!this.userData?.email){
      this.dialog.open(DialogModalComponent, {
        data:{
          title:"Utente non loggato",
          subtitle:"Fai la login"
        }
      });
      this.router.navigate(['/login-page']);
    }
    else{
      this.eventService.retrieveEvents().then(res => {

      }); //da leggere gli eventi dal servizio
    }
  }

  openDescription(description:string){
    this.dialog.open(DialogModalComponent, {
			data:{
				title: description,
				subtitle:"La descrizione dell' "+description+""
			}
		});
  }

  goToLoginPage(){
    this.router.navigate(['/login-page']);
  }
}

