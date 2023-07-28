import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViatgesService {

  constructor(private http: HttpClient) { }

  retornarViatge() {
    return this.http.get("https://app-titu.herokuapp.com/Ruta");
  }
}
