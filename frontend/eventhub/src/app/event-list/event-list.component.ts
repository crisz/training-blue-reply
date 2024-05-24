import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  constructor(private router: Router, private httpClient: HttpClient){

  }

  goToPageLogin(){
    this.router.navigate(['/login-page']); // Navigate to the 'other' route
  }

  getEvents() {
    this.httpClient.get('/api/events').subscribe();
  }
}
