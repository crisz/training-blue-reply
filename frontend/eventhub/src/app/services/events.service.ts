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
  
  createEvent():Promise<any>{
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
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      formData.append('image', "ciasaosaasdsafdasfas");
    return firstValueFrom(this.httpClient.post('api/events', formData));
  }
}
