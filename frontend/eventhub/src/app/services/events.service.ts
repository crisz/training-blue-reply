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
  
  async createEvent():Promise<any>{
    //da capire come mandare questa richiesta
    const formData = new FormData();
    const data = {
      description: "ciao",
      place: "ciao",
      title: "cioa"
    };
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    }
    formData.append('description' , 'ciao');
    formData.append('title' , 'ciao');
    formData.append('place', "ciao");
    const result = await fetch("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==") ;
    const blob = await result.blob();
    formData.append('image', blob,'immagine.png');
    return firstValueFrom(this.httpClient.post('api/events', formData));
  }
}
