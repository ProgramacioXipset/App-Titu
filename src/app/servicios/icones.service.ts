import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconesService {

  constructor(private http: HttpClient) { }

  retornarIcones() {
    return this.http.get("http://localhost:8181/Icones");
  }
}
