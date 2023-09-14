import { Component } from '@angular/core';
import { AnadaService } from 'src/app/servicios/anada.service';
import { EventosService } from 'src/app/servicios/eventos.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupModificarViatgeComponent } from '../../popup-modificar-viatge/popup-modificar-viatge.component';
import { MarcadoService } from 'src/app/servicios/marcado.service';

@Component({
  selector: 'app-taula-anada',
  templateUrl: './taula-anada.component.html',
  styleUrls: ['./taula-anada.component.css']
})
export class TaulaAnadaComponent {
  anades: any[] = [];
  dialogOpen = false;
  selectedAnada: any;

  constructor(public marcadoService: MarcadoService, private anadaService:AnadaService, private eventosService: EventosService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.cargarAnada();
    this.eventosService.viatgeCreated$.subscribe(() => {
      this.cargarAnada(); // Actualiza los xofers cuando se crea uno nuevo
    });
    this.eventosService.viatgeDeleted$.subscribe(() => {
      this.cargarAnada(); // Actualiza los xofers cuando se crea uno nuevo
    });
  }

  cargarAnada() {
    this.anadaService.retornarAnada()
    .subscribe( (result: any) => {this.anades = result;});
  }

  openDialog(anada: any) {
    this.selectedAnada = anada;
    this.dialogOpen = true;

    console.log(this.selectedAnada.id);

    const dialogRef = this.dialog.open(PopupModificarViatgeComponent, {
      data: { viatge: this.selectedAnada, tipus: "anada" },
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Realiza acciones después de que se cierre el diálogo si es necesario
      this.dialogOpen = false;
      this.cargarAnada(); // Actualiza los xofers al cerrar el diálogo
    });
  }

  marcar(anada: any) {
    if(!anada.externa) {
      if (this.marcadoService.obtenerElementosInferioresMarcados().includes(anada)) {
        this.marcadoService.desmarcarElementosInferior();
        this.openDialog(anada);
      } else {
        this.marcadoService.marcarElementoInferior(anada);
      }
    } else {
      this.openDialog(anada);
    }
  }
}
