import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoDisponibleService {

  constructor(private http: HttpClient) { }

  retornarXoferNoDisponible() {
    return this.http.get("http://localhost:8181/XoferNoDisponible");
  }
}
