import { Component, Output,EventEmitter } from '@angular/core';
import { XoferService } from 'src/app/servicios/xofer.service';
import { PopupModificarXoferComponent } from '../popup-modificar-xofer/popup-modificar-xofer.component';
import { PopupModificarViatgeComponent } from '../popup-modificar-viatge/popup-modificar-viatge.component';
import { MatDialog } from '@angular/material/dialog';
import { EventosService } from 'src/app/servicios/eventos.service';
import { ViatgesService } from 'src/app/servicios/viatges.service';
import { DateService } from 'src/app/servicios/data.service';
import { MarcadoService } from 'src/app/servicios/marcado.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-taula-principal',
  templateUrl: './taula-principal.component.html',
  styleUrls: ['./taula-principal.component.css']
})
export class TaulaPrincipalComponent {
  @Output() rutaModificada: EventEmitter<any> = new EventEmitter();
  xofers: any = null;
  viatges: any = null;
  dialogOpen = false;
  selectedXofer: any;
  dataAvuiFormatejada: string;
  dataDemaFormatejada: string;
  dataPassatDemaFormatejada: string;
  dataAhirFormatejada: string;
  enviado: boolean | null = null;
  editando: any = null;

  constructor(public marcadoService: MarcadoService, private http: HttpClient, public dateService: DateService, private viatgeService: ViatgesService, private xoferService: XoferService, public dialog: MatDialog, private eventosService: EventosService) {
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
    for (const viatge of ruta.viatge) {
      if (viatge.dia === dia && viatge.tipus === 1) {
        return true;
      }

      if (viatge.dia === dia && viatge.tipus === 2) {
        return true;
      }

      if (viatge.dia === dia && viatge.tipus === 3) {
        return true;
      }
    }
    return false;
  }

  pipeAzul(ruta: any, anterior: boolean, dia: Date ): boolean {
    dia.setHours(0,0,0,0);

    if (anterior) {
      for (const viatge of ruta.viatge) {
        var diaViatge = new Date(viatge.dia)
        diaViatge.setHours(0,0,0,0);
        if (diaViatge < dia) {
          return true;
        }
      }
    } else {
      for (const viatge of ruta.viatge) {
        var diaViatge = new Date(viatge.dia)
        diaViatge.setHours(0,0,0,0);
        if (diaViatge > dia) {
          return true;
        }
      }
    }

    return false;
  }

  marcar(elemento: any, ruta: any) {
    if (this.marcadoService.obtenerElementosSuperioresMarcados().includes(elemento)) {
      this.marcadoService.desmarcarElementosSuperior();
      console.log(elemento);

      if (this.marcadoService.obtenerRutasMarcadas().includes(ruta)) {
        this.marcadoService.desmarcarRuta();

      } else {
        this.marcadoService.marcarRuta(ruta);
      }
    } else {
      this.marcadoService.marcarElementoSuperior(elemento);
    }
  }

  eliminar() {
    if (this.marcadoService.obtenerRutasMarcadas().length != 0) {
      const confirmed = confirm('Segur que vols eliminar aquesta ruta?');

      if (confirmed) {
        const endpoint = "http://localhost:8181/Ruta/" + this.marcadoService.obtenerRutasMarcadas()[0].id;

        if (endpoint) {
          this.eliminarRuta(endpoint).subscribe(
            (response) => {
              console.log('Formulario enviado correctamente');
              this.enviado = true;
              this.cargarXofers(); // Llama al método para cargar los xofers al iniciar el componente
              this.cargarViatges();
              this.eventosService.emitViatgeDeleted();

            },
            (error) => {
              console.error('Error al enviar el formulario:', error);
              this.enviado = false;
            }
          );
        } else {
          console.error('Endpoint no válido');
        }
      }
    } else if (this.marcadoService.obtenerElementosSuperioresMarcados().length != 0) {
      const confirmed = confirm('Segur que vols retirar aquest viatge de la ruta?');

      if (confirmed) {
        this.modificarViaje(this.marcadoService.obtenerElementosSuperioresMarcados()[0], null, null)
      }
    }
  }

  eliminarRuta(endpoint: string) {
    const token = window.sessionStorage.getItem("auth-token"); // Reemplaza con el valor real de tu token
    console.log(token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(endpoint, { headers: headers });
  }

  afegir(xofer: any, dia: string) {
    if (this.marcadoService.obtenerElementosInferioresMarcados().length != 0 && this.editando === null) {
      const endpoint = "http://localhost:8181/Ruta";
      var rutaId = 0;

      const requestBody = {
        id_xofer: {id: +xofer.id}
      };


      if (endpoint) {
        this.saveFormData(endpoint, requestBody).subscribe(
          (response: any) => {
            rutaId = response.id;
            this.modificarViaje(this.marcadoService.obtenerElementosInferioresMarcados()[0], rutaId, dia);
            console.log('Formulario enviado correctamente');
            // Realizar acciones adicionales después de guardar los datos en la base de datos
            this.enviado = true;
          },
          (error) => {
            console.error('Error al enviar el formulario:', error);
            // Manejar el error en caso de que ocurra
            this.enviado = false;
          }
        );
      } else {
        console.error('Endpoint no válido');
        // Manejar el caso cuando no se encuentra un endpoint válido
      }
    } else if (this.editando != null) {
      this.modificarViaje(this.marcadoService.obtenerElementosInferioresMarcados()[0], this.editando.id, dia);
    }
  }

  saveFormData(endpoint: string, formData: any) {
    return this.http.post(endpoint, formData);
  }

  modificarViaje(viaje: any, ruta: number | null, dia: string | null) {
    const endpoint = "http://localhost:8181/Viatge/" + viaje.id;
    var requestBody = null

    if (ruta === null) {
      requestBody = {
        id: viaje.id,
        id_direccio_origen: {id: +viaje.id_direccio_origen.id},
        id_direccio_desti: {id: +viaje.id_direccio_desti.id},
        comentari: viaje.comentari,
        dia: viaje.dia,
        tipus: viaje.tipus
      };
    } else {
      requestBody = {
        id: viaje.id,
        id_direccio_origen: {id: +viaje.id_direccio_origen.id},
        id_direccio_desti: {id: +viaje.id_direccio_desti.id},
        comentari: viaje.comentari,
        dia: dia,
        tipus: viaje.tipus,
        id_ruta: {id: +ruta}
      };
    }

    console.log(requestBody);


    if (endpoint) {
      this.updateFormData(endpoint, requestBody).subscribe(
        (response) => {
          console.log('Formulario enviado correctamente');
          this.enviado = true;
          this.cargarXofers(); // Llama al método para cargar los xofers al iniciar el componente
          this.cargarViatges();
          this.eventosService.emitViatgeDeleted();
        },
        (error) => {
          console.error('Error al enviar el formulario:', error);
          this.enviado = false;
        }
      );
    } else {
      console.error('Endpoint no válido');
    }
  }

  updateFormData(endpoint: string, formData: any) {
    const token = window.sessionStorage.getItem("auth-token"); // Reemplaza con el valor real de tu token
    console.log(token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(endpoint, formData, { headers: headers });
  }

  editar() {
    if (this.marcadoService.obtenerElementosSuperioresMarcados().length != 0) {
      this.editando = null;
      var selectedAnada = this.marcadoService.obtenerElementosSuperioresMarcados()[0];

      const dialogRef = this.dialog.open(PopupModificarViatgeComponent, {
        data: { viatge: selectedAnada },
        height: '500px',
        width: '700px',
      });

      dialogRef.afterClosed().subscribe(result => {
        // Realiza acciones después de que se cierre el diálogo si es necesario
        this.dialogOpen = false;
        this.cargarViatges(); // Actualiza los xofers al cerrar el diálogo
      });
    } else if (this.marcadoService.obtenerRutasMarcadas().length != 0) {
      this.editando = this.marcadoService.obtenerRutasMarcadas()[0];
      this.marcadoService.desmarcarRuta();
    } else {
      this.editando = null;
    }
  }

  dejarEditar() {
    this.editando = null;
  }
}
