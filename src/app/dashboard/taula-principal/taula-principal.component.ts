import { Component } from '@angular/core';
import { XoferService } from 'src/app/servicios/xofer.service';
import { PopupModificarXoferComponent } from '../popup-modificar-xofer/popup-modificar-xofer.component';
import { MatDialog } from '@angular/material/dialog';
import { EventosService } from 'src/app/servicios/eventos.service';

@Component({
  selector: 'app-taula-principal',
  templateUrl: './taula-principal.component.html',
  styleUrls: ['./taula-principal.component.css']
})
export class TaulaPrincipalComponent {
  xofers: any = null;
  dialogOpen = false;
  selectedXofer: any;

  constructor(private xoferService: XoferService, public dialog: MatDialog, private eventosService: EventosService) {

  }

  ngOnInit(): void {
    this.cargarXofers(); // Llama al método para cargar los xofers al iniciar el componente
    this.eventosService.xoferCreated$.subscribe(() => {
      this.cargarXofers(); // Actualiza los xofers cuando se crea uno nuevo
    });
  }

  cargarXofers() {
    this.xoferService.retornarXofer()
      .subscribe((result: any) => {
        this.xofers = result;
      });
  }

  openDialog(xofer: any) {
    this.selectedXofer = xofer;
    this.dialogOpen = true;

    console.log(this.selectedXofer.nom);

    const dialogRef = this.dialog.open(PopupModificarXoferComponent, {
      data: { xofer: this.selectedXofer },
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Realiza acciones después de que se cierre el diálogo si es necesario
      this.dialogOpen = false;
      this.cargarXofers(); // Actualiza los xofers al cerrar el diálogo
    });
  }
}