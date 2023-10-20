import { Component, Input } from '@angular/core';
import { AnadaService } from 'src/app/servicios/anada.service';
import { EventosService } from 'src/app/servicios/eventos.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupModificarViatgeComponent } from '../../popup-modificar-viatge/popup-modificar-viatge.component';
import { MarcadoService } from 'src/app/servicios/marcado.service';

@Component({
  selector: 'app-taula-tornada',
  templateUrl: './taula-tornada.component.html',
  styleUrls: ['./taula-tornada.component.css']
})
export class TaulaTornadaComponent {
  @Input() fecha: string = "";
  tornades: any = null;
  dialogOpen = false;
  selectedTornada: any;

  constructor(public marcadoService: MarcadoService, private anadaService:AnadaService, private eventosService: EventosService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.cargarTornada();
    this.eventosService.viatgeCreated$.subscribe(() => {
      this.cargarTornada(); // Actualiza los xofers cuando se crea uno nuevo
    });
    this.eventosService.viatgeDeleted$.subscribe(() => {
      this.cargarTornada(); // Actualiza los xofers cuando se crea uno nuevo
    });
  }

  cargarTornada() {
    this.anadaService.retornarTornada()
    .subscribe( (result: any) => {this.tornades = result;});
  }

  openDialog(tornada: any) {
    this.selectedTornada = tornada;
    this.dialogOpen = true;

    console.log(this.selectedTornada.id);

    const dialogRef = this.dialog.open(PopupModificarViatgeComponent, {
      data: { viatge: this.selectedTornada, tipus: "tornada" },
      height: '600px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Realiza acciones después de que se cierre el diálogo si es necesario
      this.dialogOpen = false;
      this.cargarTornada(); // Actualiza los xofers al cerrar el diálogo
    });
  }

  marcar(tornada: any) {
    if(!tornada.externa) {
      if (this.marcadoService.obtenerElementosInferioresMarcados().includes(tornada)) {
        this.marcadoService.desmarcarElementosInferior();
        this.openDialog(tornada);
      } else {
        this.marcadoService.marcarElementoInferior(tornada);
      }
    } else {
      this.openDialog(tornada);
    }
  }
}
