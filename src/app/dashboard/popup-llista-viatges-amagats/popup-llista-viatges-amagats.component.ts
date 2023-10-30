import { Component } from '@angular/core';
import { AnadaService } from 'src/app/servicios/anada.service';
import { PopupModificarViatgeComponent } from '../popup-modificar-viatge/popup-modificar-viatge.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-llista-viatges-amagats',
  templateUrl: './popup-llista-viatges-amagats.component.html',
  styleUrls: ['./popup-llista-viatges-amagats.component.css']
})
export class PopupLlistaViatgesAmagatsComponent {
  viatges: any;

  constructor(public anadaService: AnadaService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cargarViatge();
  }

  openDialog(viatge: any) {

    var tipus

    if (viatge.tipus === 1) {
      tipus = "avuiXAvui";
    } else if (viatge.tipus === 2) {
      tipus = "anada";
    } else if (viatge.tipus === 3) {
      tipus = "tornada"
    }

    const dialogRef = this.dialog.open(PopupModificarViatgeComponent, {
      data: { viatge: viatge, tipus: tipus},
      height: '600px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarViatge(); // Actualiza los xofers al cerrar el diálogo
    });
  }

  cargarViatge() {
    this.anadaService.retornarViatge()
      .subscribe( (result: any) => {this.viatges = result;});
  }
}
