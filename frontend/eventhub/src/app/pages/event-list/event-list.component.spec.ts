import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { EventListComponent } from './event-list.component';
import { AuthenticationService } from '../../services/authentication.service';
import { EventsService } from '../../services/events.service';
import { DialogService } from '../../services/dialog.service';
import { UserObj } from '../../models/user';
import { EventObj } from '../../models/event';
import { AddEventModalComponent } from '../../modal/add-event-modal/add-event-modal.component';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let authService: jest.Mocked<AuthenticationService>;
  let eventService: jest.Mocked<EventsService>;
  let router: jest.Mocked<Router>;
  let store: jest.Mocked<Store>;
  let dialogService: jest.Mocked<DialogService>;
  let snackBar: jest.Mocked<MatSnackBar>;
  let dialog: jest.Mocked<MatDialog>;

  beforeEach(async () => {
    const authServiceMock = {
      isLoggedIn: jest.fn(),
      getUserLogged: jest.fn(),
      logout: jest.fn(),
    };

    const eventServiceMock = {
      retrieveAllEvents: jest.fn(),
      retrieveMyEvents: jest.fn(),
      partecipaEvent: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    const storeMock = {
      dispatch: jest.fn(),
    };

    const dialogServiceMock = {
      openDialogMessage: jest.fn(),
    };

    const snackBarMock = {
      open: jest.fn(),
    };

    const dialogMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn(() => of({ success: true })),
      } as unknown as MatDialogRef<unknown, unknown>),
    };

    await TestBed.configureTestingModule({
      imports: [EventListComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: EventsService, useValue: eventServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock },
        { provide: DialogService, useValue: dialogServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService) as jest.Mocked<AuthenticationService>;
    eventService = TestBed.inject(EventsService) as jest.Mocked<EventsService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    store = TestBed.inject(Store) as jest.Mocked<Store>;
    dialogService = TestBed.inject(DialogService) as jest.Mocked<DialogService>;
    snackBar = TestBed.inject(MatSnackBar) as jest.Mocked<MatSnackBar>;
    dialog = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
