import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private currentDateSubject: Subject<Date> = new Subject<Date>();
  currentDate$ = this.currentDateSubject.asObservable();

  dataAhir: Date;
  dataAvui: Date;
  dataDema: Date;
  dataPassatDema: Date;

  constructor() {
    this.dataAhir = new Date();
    this.dataAvui = new Date();
    this.dataDema = new Date();
    this.dataPassatDema = new Date();
    this.dataAhir.setDate(this.dataAvui.getDate() - 1);
    this.dataDema.setDate(this.dataAvui.getDate() + 1);
    this.dataPassatDema.setDate(this.dataAvui.getDate() + 2);
    this.currentDateSubject.next(this.dataAvui);
  }

  getDataAvui(): Date {
    return this.dataAvui;
  }

  getDataDema(): Date {
    return this.dataDema;
  }

  getDataPassatDema(): Date {
    return this.dataPassatDema;
  }

  getDataAhir(): Date {
    return this.dataAhir;
  }

  setDataAvuiDema(date: Date) {
    this.dataAvui = date;
    this.dataDema = new Date(date);
    this.dataAhir = new Date(date);
    this.dataDema.setDate(this.dataDema.getDate() + 1);
    this.dataAhir.setDate(this.dataAhir.getDate() - 1);
    this.dataPassatDema.setDate(this.dataAvui.getDate() + 2);
    this.currentDateSubject.next(this.dataAvui);
  }

  diaSeguent() {
    this.dataAvui.setDate(this.dataAvui.getDate() + 1);
    this.dataDema.setDate(this.dataDema.getDate() + 1);
    this.dataPassatDema.setDate(this.dataPassatDema.getDate() + 1);
    this.dataAhir.setDate(this.dataAhir.getDate() + 1);
    this.currentDateSubject.next(this.dataAvui);
  }

  diaAnterior() {
    this.dataAvui.setDate(this.dataAvui.getDate() - 1);
    this.dataDema.setDate(this.dataDema.getDate() - 1);
    this.dataPassatDema.setDate(this.dataPassatDema.getDate() - 1);
    this.dataAhir.setDate(this.dataAhir.getDate() - 1);
    this.currentDateSubject.next(this.dataAvui);
  }
}
