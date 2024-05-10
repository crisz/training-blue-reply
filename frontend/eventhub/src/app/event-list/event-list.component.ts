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

  constructor(private router: Router){

  }

  goToPageLogin(){
    this.router.navigate(['/login-page']); // Navigate to the 'other' route
  }

}
