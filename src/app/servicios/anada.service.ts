import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnadaService {

  constructor(private http: HttpClient) { }

  retornarViatge() {
    return this.http.get("http://localhost:8181/Viatge");
  }

  retornarAnada() {
    return this.http.get("http://localhost:8181/Anada");
  }

  retornarTornada() {
    return this.http.get("http://localhost:8181/Tornada");
  }

  retornarAvuiXAvui() {
    return this.http.get("http://localhost:8181/AvuiXAvui");
  }
}
