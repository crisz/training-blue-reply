import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

  registrationForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,private router: Router,private authService: AuthenticationService, private _snackBar: MatSnackBar,private dialogService: DialogService){

  }

  ngOnInit() {
		this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

  register(){
		this.authService.register(this.registrationForm?.value).then(res => {
      if (res) {
        this._snackBar.open("Registration is Success", "OK");
				this.router.navigateByUrl('/login-page', { replaceUrl: true });
      } else {
        this.dialogService.openDialogMessage("Errore","Errore durante il processo di login");
      }
    }).catch(error => {
      this.dialogService.openDialogMessage("Errore","Errore durante il processo di login");
      });
    ;
}

  goBack(){
		this.router.navigate(['/login-page']);
	}

  goToPageLogin(){
    this.router.navigate(['/login-page']); // Navigate to the 'other' route
  }

	// Easy access for form fields
	get email() {
		return this.registrationForm?.get('email');
	}

	get password() {
		return this.registrationForm?.get('password');
	}
}
