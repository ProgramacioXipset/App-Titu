import { Component, OnInit, HostListener, LOCALE_ID } from '@angular/core';
import { DateService } from 'src/app/servicios/data.service';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { PopupCrearComponent } from '../popup-crear/popup-crear.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es' }
  ]
})
export class NavbarComponent implements OnInit {
  dataAvuiFormatejada: string | null;
  dataDemaFormatejada: string | null;
  isAuthenticated: boolean;
  fechaControl = new FormControl();
  selectedDate: FormControl = new FormControl();

  constructor(public dialog: MatDialog, private dateService: DateService, private loginService: LoginService, private router: Router, private datePipe: DatePipe) {
    this.dataAvuiFormatejada = this.datePipe.transform(this.dateService.dataAvui, 'EEEE dd/MM/yy');
    this.dataDemaFormatejada = this.datePipe.transform(this.dateService.dataDema, 'EEEE dd/MM/yy');
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.dateService.currentDate$.subscribe(date => {
      this.dataAvuiFormatejada = this.datePipe.transform(date, 'EEEE dd/MM/yy');
      this.dataDemaFormatejada = this.datePipe.transform(this.dateService.dataDema, 'EEEE dd/MM/yy');
    });

    this.loginService.getUser$().subscribe(user => {
      this.isAuthenticated = user !== null;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupCrearComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  diaSeguent() {
    this.dateService.diaSeguent();
  }

  diaAnterior() {
    this.dateService.diaAnterior();
  }

  setDate(selectedDate: Date) {
    this.selectedDate.setValue(selectedDate);
    this.dateService.setDataAvuiDema(selectedDate);
  }

  sortir() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  private formatDate(date: Date): string {
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear()
    );
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') { // Cambia 'Enter' a la tecla que desees usar
      // Llama al método que corresponde al evento (click)
      this.diaSeguent();
    } else if (event.key === 'ArrowLeft') {
      this.diaAnterior();
    }
  }
}
