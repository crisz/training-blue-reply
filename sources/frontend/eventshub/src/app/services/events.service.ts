import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { EventAction } from '../../state/event-state/event.action';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  retrieveAllEvents(): Promise<Event[]> {
    return firstValueFrom(this.httpClient.get('api/events/all')).then(
      (res: any) => {
        return res;
      },
      (error) => {
        // Handle the error here if needed
        console.error(error);
        throw error;
      }
    );
  }

  retrieveMyEvents(): Promise<any> {
    return firstValueFrom(this.httpClient.get('api/events')).then(
      (res: any) => {
        return res;
      },
      (error) => {
        // Handle the error here if needed
        console.error(error);
        throw error;
      }
    );
  }

  async eventParticipate(event: Event): Promise<any> {
    let eventId = event.id;
    try {
      const response = await fetch('api/events/' + eventId + '/participate', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async eventRemoveParticipation(event: Event): Promise<any> {
    let eventId = event.id;
    try {
      const response = await fetch('api/events/' + eventId + '/removeParticipation', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async createEvent(event: FormData): Promise<any> {
    try {
      const response = await fetch('api/events/multipart', {
        method: 'POST',
        body: event,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async createEvent2(event: FormData): Promise<any> {
    try {
      const response = await fetch('api/events/multipart', {
        method: 'POST',
        body: event,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  getEventImage(imageid: string): Promise<Blob> {
    const headers = new HttpHeaders({
      Accept: 'image/svg+xml',
    });
    return firstValueFrom(
      this.httpClient.get('api/events/image/' + imageid + '', {
        headers,
        responseType: 'blob',
      })
    ).then(
      (res: any) => {
        //res = this.convertSvgToBase64(res);
        return res;
      },
      (error) => {
        // Handle the error here if needed
        console.error(error);
        throw error;
      }
    );
  }

  convertSvgToBase64(svg: string): string {
    return (
      'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)))
    );
  }
}
