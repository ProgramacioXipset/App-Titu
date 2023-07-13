import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnadaService {

  constructor(private http: HttpClient) { }

  retornarAnada() {
    return this.http.get("https://app-titu.herokuapp.com/Anada");
  }

  retornarTornada() {
    return this.http.get("https://app-titu.herokuapp.com/Tornada");
  }

  retornarAvuiXAvui() {
    return this.http.get("https://app-titu.herokuapp.com/AvuiXAvui");
  }
}
