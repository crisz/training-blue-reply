import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from '../../modal/dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

  registrationForm: FormGroup = new FormGroup({});
  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder,private router: Router,private authService: AuthenticationService, private alertController: AlertController){

  }

  ngOnInit() {
		this.registrationForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

  register(){
		this.authService.register(this.registrationForm?.value).then(async res => {
      if (res) {
				this.router.navigateByUrl('/events-list', { replaceUrl: true });
      } else {
				this.dialog.open(DialogModalComponent, {
          data:{
            title:"Errore",
            subtitle:"Errore durante il processo di login"
          }
        });
      }
    }).catch(async error => {
      this.dialog.open(DialogModalComponent, {
        data:{
          title:"Errore",
          subtitle:"Errore durante il processo di login"
        }
      });
      });
    ;
}

  goBack(){
		this.router.navigate(['/events-list']);
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
