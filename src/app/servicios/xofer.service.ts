import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class XoferService {

  constructor(private http: HttpClient) { }

  retornarXofer() {
    return this.http.get("http://localhost:8181/Xofer");
  }
}
