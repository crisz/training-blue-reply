import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

export const routes: Routes = [ // Define your routes
{ path: '', redirectTo: 'events-list', pathMatch: 'full' },
{ path: 'login-page', component: LoginPageComponent },
{ path: 'events-list', component: EventListComponent },
{ path: 'app-registration-page', component: RegistrationPageComponent }];
