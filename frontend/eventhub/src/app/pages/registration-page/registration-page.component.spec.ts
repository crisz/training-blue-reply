import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { DialogModalComponent } from '../../modal/dialog-modal/dialog-modal.component';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let authServiceMock: any;
  let routerMock: any;
  let snackBarMock: any;
  let dialogMock: any;

  beforeEach(async () => {

    authServiceMock = {
      register: jest.fn()
    };
    
    routerMock = {
      navigateByUrl: jest.fn(),
      navigate: jest.fn()
    };

    snackBarMock = {
      open: jest.fn()
    };

    dialogMock = {
      open: jest.fn()
    };
    
    await TestBed.configureTestingModule({
      imports: [RegistrationPageComponent, HttpClientModule, NoopAnimationsModule],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registration form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm.controls['username']).toBeDefined();
    expect(component.registrationForm.controls['email']).toBeDefined();
    expect(component.registrationForm.controls['password']).toBeDefined();
  });

  it('should call authService.register and navigate on successful registration', async () => {
    const mockResponse = Promise.resolve(true);
    authServiceMock.register.mockReturnValue(mockResponse);

    component.registrationForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    await component.register();
    expect(authServiceMock.register).toHaveBeenCalledWith(component.registrationForm.value);
    expect(snackBarMock.open).toHaveBeenCalledWith('Registration is Success', 'OK');
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login-page', { replaceUrl: true });
  });

  it('should open dialog on registration failure', async () => {
    const mockResponse = Promise.resolve(false);
    authServiceMock.register.mockReturnValue(mockResponse);

    component.registrationForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    await component.register();
    expect(authServiceMock.register).toHaveBeenCalledWith(component.registrationForm.value);
    expect(dialogMock.open).toHaveBeenCalledWith(DialogModalComponent, {
      data: {
        title: 'Errore',
        subTitle: 'Errore durante il processo di login'
      }
    });
  });

  it('should open dialog on registration error', async () => {
    authServiceMock.register.mockReturnValue(Promise.reject('error'));

    component.registrationForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    await component.register();
    expect(authServiceMock.register).toHaveBeenCalledWith(component.registrationForm.value);
    expect(dialogMock.open).toHaveBeenCalledWith(DialogModalComponent, {
      data: {
        title: 'Errore',
        subtitle: 'Errore durante il processo di login'
      }
    });
  });

  it('should navigate to login page on goBack', () => {
    component.goBack();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login-page']);
  });

  it('should navigate to login page on goToPageLogin', () => {
    component.goToPageLogin();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login-page']);
  });
});
