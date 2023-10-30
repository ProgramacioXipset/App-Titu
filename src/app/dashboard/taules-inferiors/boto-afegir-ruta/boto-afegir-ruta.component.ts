import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PopupCrearViatgeComponent } from '../../popup-crear-viatge/popup-crear-viatge.component';
import { PopupLlistaViatgesAmagatsComponent } from '../../popup-llista-viatges-amagats/popup-llista-viatges-amagats.component';

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

  obrirLlista():void {
    const dialogRef = this.dialog.open(PopupLlistaViatgesAmagatsComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
