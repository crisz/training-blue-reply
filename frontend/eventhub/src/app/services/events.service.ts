import { HttpClient, HttpHeaders } from '@angular/common/http';
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
