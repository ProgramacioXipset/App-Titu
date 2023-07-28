import { Component } from '@angular/core';
import { AnadaService } from 'src/app/servicios/anada.service';
import { EventosService } from 'src/app/servicios/eventos.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupModificarViatgeComponent } from '../../popup-modificar-viatge/popup-modificar-viatge.component';
import { MarcadoService } from 'src/app/servicios/marcado.service';

@Component({
  selector: 'app-taula-avuixavui',
  templateUrl: './taula-avuixavui.component.html',
  styleUrls: ['./taula-avuixavui.component.css']
})
export class TaulaAvuixavuiComponent {
  avuiXAvuis: any = null;
  dialogOpen = false;
  selectedAvuiXAvui: any;

  constructor(public marcadoService: MarcadoService, private anadaService:AnadaService, private eventosService: EventosService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.cargarAvuiXAvui();
    this.eventosService.viatgeCreated$.subscribe(() => {
      this.cargarAvuiXAvui(); // Actualiza los xofers cuando se crea uno nuevo
    });
  }

  cargarAvuiXAvui() {
    this.anadaService.retornarAvuiXAvui()
      .subscribe( (result: any) => {this.avuiXAvuis = result;});
  }

  openDialog(avuiXAvui: any) {
    this.selectedAvuiXAvui = avuiXAvui;
    this.dialogOpen = true;

    console.log(this.selectedAvuiXAvui.id);

    const dialogRef = this.dialog.open(PopupModificarViatgeComponent, {
      data: { viatge: this.selectedAvuiXAvui, tipus: "avuiXAvui" },
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Realiza acciones después de que se cierre el diálogo si es necesario
      this.dialogOpen = false;
      this.cargarAvuiXAvui(); // Actualiza los xofers al cerrar el diálogo
    });
  }

  marcar(avuiXAvui: any) {
    if(!avuiXAvui.externa) {
      if (this.marcadoService.obtenerElementosMarcados().includes(avuiXAvui)) {
        this.marcadoService.desmarcarElementos();
        this.openDialog(avuiXAvui);
      } else {
        this.marcadoService.marcarElemento(avuiXAvui);
      }
    } else {
      this.openDialog(avuiXAvui);
    }
  }
}
