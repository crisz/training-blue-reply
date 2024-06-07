import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, Routes } from '@angular/router';
import { UserState } from '../../state/user.state';
import { UserObj } from '../models/user';
import { NgxsSelectSnapshotModule, SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { SharedModule } from '../shared/shared.module';
import { Store } from '@ngxs/store';
import { UserAction } from '../../state/user.action';

@Component({
  selector: 'app-event-list',
  standalone: true,
  providers: [Store],
  imports: [SharedModule,MatButtonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  @SelectSnapshot(UserState.getUserData) public userData: UserObj | undefined; // ritorna il correlation id

  constructor(private router: Router, private httpClient: HttpClient,private store: Store){

  }

  ngOnInit(){
    this.store.dispatch(new UserAction.SetUserData({email:'',password:''}));
  }

  goToPageLogin(){
    let email = this.store.selectSnapshot(UserState.getUserEmail);
    let ciao = this.userData;
    this.router.navigate(['/login-page']); // Navigate to the 'other' route
  }

  getEvents() {
    this.httpClient.get('/api/events').subscribe();
  }
}

