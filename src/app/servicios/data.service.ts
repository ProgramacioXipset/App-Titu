import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private currentDateSubject: Subject<Date> = new Subject<Date>();
  currentDate$ = this.currentDateSubject.asObservable();

  dataAvui: Date;
  dataDema: Date;

  constructor() {
    this.dataAvui = new Date();
    this.dataDema = new Date();
    this.dataDema.setDate(this.dataAvui.getDate() + 1);
    this.currentDateSubject.next(this.dataAvui);
  }

  getDataAvui(): Date {
    return this.dataAvui;
  }

  getDataDema(): Date {
    return this.dataDema;
  }

  setDataAvuiDema(date: Date) {
    this.dataAvui = date;
    this.dataDema = new Date(date);
    this.dataDema.setDate(this.dataDema.getDate() + 1);
    this.currentDateSubject.next(this.dataAvui);
  }

  diaSeguent() {
    this.dataAvui.setDate(this.dataAvui.getDate() + 1);
    this.dataDema.setDate(this.dataDema.getDate() + 1);
    this.currentDateSubject.next(this.dataAvui);
  }

  diaAnterior() {
    this.dataAvui.setDate(this.dataAvui.getDate() - 1);
    this.dataDema.setDate(this.dataDema.getDate() - 1);
    this.currentDateSubject.next(this.dataAvui);
  }
}