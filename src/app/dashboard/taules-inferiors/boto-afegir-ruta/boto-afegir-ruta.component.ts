import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PopupCrearViatgeComponent } from '../../popup-crear-viatge/popup-crear-viatge.component';

@Component({
  selector: 'app-boto-afegir-ruta',
  templateUrl: './boto-afegir-ruta.component.html',
  styleUrls: ['./boto-afegir-ruta.component.css']
})
export class BotoAfegirRutaComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupCrearViatgeComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
