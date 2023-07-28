import { Component } from '@angular/core';
import { XoferService } from 'src/app/servicios/xofer.service';
import { PopupModificarXoferComponent } from '../popup-modificar-xofer/popup-modificar-xofer.component';
import { MatDialog } from '@angular/material/dialog';
import { EventosService } from 'src/app/servicios/eventos.service';
import { ViatgesService } from 'src/app/servicios/viatges.service';
import { DateService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-taula-principal',
  templateUrl: './taula-principal.component.html',
  styleUrls: ['./taula-principal.component.css']
})
export class TaulaPrincipalComponent {
  xofers: any = null;
  viatges: any = null;
  dialogOpen = false;
  selectedXofer: any;
  dataAvuiFormatejada: string;
  dataDemaFormatejada: string;

  constructor(private dateService: DateService, private viatgeService: ViatgesService, private xoferService: XoferService, public dialog: MatDialog, private eventosService: EventosService) {
    this.dataAvuiFormatejada = this.dateService.dataAvui.getFullYear() + "-" + (this.dateService.dataAvui.getMonth() + 1) + "-" + this.dateService.dataAvui.getDate();
    this.dataDemaFormatejada = this.dateService.dataDema.getFullYear() + "-" + (this.dateService.dataDema.getMonth() + 1) + "-" + this.dateService.dataDema.getDate();
  }

  ngOnInit(): void {
    this.cargarXofers(); // Llama al método para cargar los xofers al iniciar el componente
    this.cargarViatges();
    this.eventosService.xoferCreated$.subscribe(() => {
      this.cargarXofers(); // Actualiza los xofers cuando se crea uno nuevo
    });

    this.dateService.currentDate$.subscribe(date => {
      this.dataAvuiFormatejada = this.formatDate(date);
      this.dataDemaFormatejada = this.formatDate(this.dateService.dataDema);
    });
  }

  private formatDate(date: Date): string {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate()

    );
  }

  cargarXofers() {
    this.xoferService.retornarXofer()
      .subscribe((result: any) => {
        this.xofers = result;
      });
  }

  cargarViatges() {
    this.viatgeService.retornarViatge()
      .subscribe((result: any) => {
        this.viatges = result;
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
