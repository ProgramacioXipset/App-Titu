import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViatgesService {

  constructor(private http: HttpClient) { }

  retornarViatge() {
    return this.http.get("http://localhost:8181/Viatge");
  }

  retornarRuta() {
    return this.http.get("http://localhost:8181/Ruta");
  }

  retornarViatgeUnic(id: number) {
    return this.http.get("http://localhost:8181/Viatge/" + id);
  }
}
