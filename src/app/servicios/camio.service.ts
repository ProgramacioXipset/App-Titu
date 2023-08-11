import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CamioService {

  constructor(private http: HttpClient) { }

  retornarCamio() {
    return this.http.get("http://localhost:8181/Camio");
  }
}
