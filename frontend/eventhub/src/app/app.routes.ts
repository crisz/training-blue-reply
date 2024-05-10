import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EventListComponent } from './event-list/event-list.component';

export const routes: Routes = [ // Define your routes
{ path: '', redirectTo: 'events-list', pathMatch: 'full' },
{ path: 'login-page', component: LoginPageComponent },
{ path: 'events-list', component: EventListComponent }];
