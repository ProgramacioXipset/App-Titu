import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private xoferCreatedSource = new Subject<void>();
  private camioCreatedSource = new Subject<void>();

  xoferCreated$ = this.xoferCreatedSource.asObservable();
  camioCreated$ = this.camioCreatedSource.asObservable();

  emitXoferCreated() {
    this.xoferCreatedSource.next();
  }

  emitCamioCreated() {
    this.camioCreatedSource.next();
  }
}