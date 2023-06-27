import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemolcService {

  constructor(private http: HttpClient) { }

  retornarRemolc() {
    return this.http.get("https://app-titu.herokuapp.com/Remolc");
  }
}
