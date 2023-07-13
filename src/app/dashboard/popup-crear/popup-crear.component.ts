import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PopupCrearCamioComponent } from '../popup-crear-camio/popup-crear-camio.component';
import { PopupCrearRemolcComponent } from '../popup-crear-remolc/popup-crear-remolc.component';
import { PopupCrearXoferComponent } from '../popup-crear-xofer/popup-crear-xofer.component';

@Component({
  selector: 'app-popup-crear',
  templateUrl: './popup-crear.component.html',
  styleUrls: ['./popup-crear.component.css']
})
export class PopupCrearComponent {

  constructor(public dialog: MatDialog) {}

  openCamio(): void {
    const dialogRef = this.dialog.open(PopupCrearCamioComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRemolc(): void {
    const dialogRef = this.dialog.open(PopupCrearRemolcComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openXofer(): void {
    const dialogRef = this.dialog.open(PopupCrearXoferComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
