import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DireccioService {

  constructor(private http: HttpClient) { }

  retornarDireccio() {
    return this.http.get("https://app-titu.herokuapp.com/Direccio");
  }
}
