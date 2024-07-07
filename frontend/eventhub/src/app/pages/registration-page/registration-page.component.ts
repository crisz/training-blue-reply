import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

  registrationForm: FormGroup = new FormGroup({});

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
				const alert = await this.alertController.create({
					header: 'Registration failed',
					message: 'error',
					buttons: ['OK']
				});
        await alert.present();
      }
    });
}

  goBack(){
		this.router.navigate(['/events-list']);
	}

	// Easy access for form fields
	get email() {
		return this.registrationForm?.get('email');
	}

	get password() {
		return this.registrationForm?.get('password');
	}
}
