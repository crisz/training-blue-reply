import { Component, Optional, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedModule } from '../../shared/shared.module';
import { UserAction } from '../../../state/user-state/user.action';
import {  Store } from '@ngxs/store';
import { IUserState } from '../../models/user';
import { UserState } from '../../../state/user-state/user.state';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from '../../modal/dialog-modal/dialog-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventAction } from '../../../state/event-state/event.action';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ SharedModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup({});
  readonly dialog = inject(MatDialog);

	constructor(
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private router: Router,
		private _snackBar : MatSnackBar,
		private store : Store
	) {
   
  }

	ngOnInit() {
		this.loginForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(6)]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	async login() {
		this.authService.login(this.loginForm?.value).then(async res => {
      if (res) {
		//mock 
		res.email = "miaemail@gmail.com" //dovrebbe restituirla il servizio
		this._snackBar.open("Login is Success", "OK");
		this.store.dispatch(new UserAction.SetUserData({email: res.email, password :this.loginForm?.value.password, username :this.loginForm?.value.username}));
				this.router.navigateByUrl('/events-list', { replaceUrl: true });
      } else {
		this.dialog.open(DialogModalComponent, {
			data:{
				title:"Errore",
				subtitle:"Errore durante il processo di login"
			}
		});
      }
    })
    .catch(async error => {
		this.dialog.open(DialogModalComponent, {
			data:{
				title:"Errore",
				subtitle:"Errore durante il processo di login"
			}
		});
    });
	}

	goBack(){
		this.router.navigate(['/events-list']);
	}

	goToPageSignOn(){
		this.router.navigate(['/app-registration-page']); // Navigate to the 'other' route
	  }

	// Easy access for form fields
	get email() {
		return this.loginForm?.get('email');
	}

	get password() {
		return this.loginForm?.get('password');
	}
}
