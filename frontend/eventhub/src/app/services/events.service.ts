import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  retrieveEvents(): Promise<any> {
    return firstValueFrom(this.httpClient.get('api/events'));
  }
}
