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
  dataPassatDemaFormatejada: string;
  dataAhirFormatejada: string;

  constructor(public dateService: DateService, private viatgeService: ViatgesService, private xoferService: XoferService, public dialog: MatDialog, private eventosService: EventosService) {
    this.dataAvuiFormatejada = this.formatDate(this.dateService.dataAvui);
    this.dataDemaFormatejada = this.formatDate(this.dateService.dataDema);
    this.dataPassatDemaFormatejada = this.formatDate(this.dateService.dataPassatDema);
    this.dataAhirFormatejada = this.formatDate(this.dateService.dataAhir);
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
      this.dataPassatDemaFormatejada = this.formatDate(this.dateService.dataPassatDema);
      this.dataAhirFormatejada = this.formatDate(this.dateService.dataAhir);
    });

    console.log(this.dataAhirFormatejada);

  }

  private formatDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
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

  colocarPipes(ruta: any, dia:string): boolean {
    for (const avui_x_avui of ruta.avui_x_avui) {
      if (avui_x_avui.dia === dia) {
        return true;
      }
    }
    for (const anada of ruta.anada) {
      if (anada.dia === dia) {
        return true;
      }
    }
    for (const tornada of ruta.tornada) {
      if (tornada.dia === dia) {
        return true;
      }
    }

    return false;
  }

  pipeAzul(ruta: any, anterior: boolean, dia: Date ): boolean {
    dia.setHours(0,0,0,0);

    if (anterior) {
      for (const avui_x_avui of ruta.avui_x_avui) {
        var diaViatge = new Date(avui_x_avui.dia)
        diaViatge.setHours(0,0,0,0);
        if (diaViatge < dia) {
          console.log(new Date(avui_x_avui.dia) + " y " + dia);
          return true;
        }
      }
      for (const anada of ruta.anada) {
        var diaViatge = new Date(anada.dia)
        diaViatge.setHours(0,0,0,0);
        if (diaViatge < dia) {
          console.log(new Date(anada.dia) + " y " + dia);
          return true;
        }
      }
      for (const tornada of ruta.tornada) {
        var diaViatge = new Date(tornada.dia)
        diaViatge.setHours(0,0,0,0);
        if (diaViatge < dia) {
          console.log(new Date(tornada.dia) + " y " + dia);
          return true;
        }
      }
    } else {
      for (const avui_x_avui of ruta.avui_x_avui) {
        var diaViatge = new Date(avui_x_avui.dia)
        diaViatge.setHours(0,0,0,0);
        if (diaViatge > dia) {
          return true;
        }
      }
      for (const anada of ruta.anada) {
        var diaViatge = new Date(anada.dia)
        diaViatge.setHours(0,0,0,0);
        if (diaViatge > dia) {
          return true;
        }
      }
      for (const tornada of ruta.tornada) {
        var diaViatge = new Date(tornada.dia)
        diaViatge.setHours(0,0,0,0);
        if (diaViatge > dia) {
          return true;
        }
      }
    }

    return false;
  }
}
