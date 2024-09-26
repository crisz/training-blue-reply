import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventsService } from './events.service';
import { Store } from '@ngxs/store';
import { EventAction } from '../../state/event-state/event.action';
import { Event } from '../models/event';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;
  let storeSpy: jest.Mocked<Store>;

  beforeEach(() => {
    const spy = {
      dispatch: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EventsService,
        { provide: Store, useValue: spy }
      ]
    });

    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
    storeSpy = TestBed.inject(Store) as jest.Mocked<Store>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all events and dispatch action', async () => {
    const mockEvents: Event[] = [{ id: "1", title: 'Event 1', description: 'Description 1', place: 'Place 1',imageUrl:"cc",participantIds:[] }];
    
    service.retrieveAllEvents().then(events => {
      expect(events).toEqual(mockEvents);
      expect(storeSpy.dispatch).toHaveBeenCalledWith(new EventAction.SetEventDataList(mockEvents));
    });

    const req = httpMock.expectOne('api/events/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

  it('should retrieve my events and dispatch action', async () => {
    const mockEvents: Event[] = [{ id: "1", title: 'My Event 1', description: 'My Description 1', place: 'My Place 1' ,imageUrl:"cc",participantIds:[]}];
    
    service.retrieveMyEvents().then(events => {
      expect(events).toEqual(mockEvents);
      expect(storeSpy.dispatch).toHaveBeenCalledWith(new EventAction.SetMyAEventDataList(mockEvents));
    });

    const req = httpMock.expectOne('api/events');
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

});
