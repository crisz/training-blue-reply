import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { EventAction } from '../../state/event-state/event.action';
import { EventObj } from '../models/event';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  constructor(private httpClient: HttpClient,private store: Store) { }

  retrieveAllEvents(): Promise<EventObj[]>  {
    return firstValueFrom(this.httpClient.get('api/events/all')).then(
      (res : any) => {
        this.store.dispatch(new EventAction.SetEventDataList(res));
        return res;
      },
      error => {
        // Handle the error here if needed
        console.error(error);
        throw error;
      }
    );
  }

  retrieveMyEvents(): Promise<any> {
    return firstValueFrom(this.httpClient.get('api/events')).then(
      (res : any) => {
        this.store.dispatch(new EventAction.SetMyAEventDataList(res));
        return res;
      },
      error => {
        // Handle the error here if needed
        console.error(error);
        throw error;
      }
    );
  }

  async partecipaEvent(event: EventObj): Promise<any>{
    let eventId = event.id;
    try {
      const response = await fetch('api/events/'+eventId+'/participate', {
          method: 'POST'
      });
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
      return await response.json();
  } catch (error) {
      console.error('Error creating event:', error);
      throw error;
  }
  }
  
  async createEvent(event: EventObj): Promise<any> {
    const description = event.description ?? '';
    const title = event.title ?? '';
    const place = event.place ?? '';

    const formData = new FormData();
    formData.append('description', description);
    formData.append('title', title);
    formData.append('place', place);

    try {
        const result = await fetch(event.imageUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='); // Usa una URL predefinita se manca
        if (!result.ok) {
            throw new Error('Failed to fetch image');
        }
        const blob = await result.blob();
        formData.append('image', blob, 'image.png');
    } catch (error) {
        console.error('Error fetching image:', error);
    }

  try {
      const response = await fetch('api/events', {
          method: 'POST',
          body: formData,
      });
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
      return await response.json();
  } catch (error) {
      console.error('Error creating event:', error);
      throw error;
  }
}
}
