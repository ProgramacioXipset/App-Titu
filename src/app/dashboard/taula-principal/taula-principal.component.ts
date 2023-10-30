import { IconesService } from './../../servicios/icones.service';
import { Component, Output,EventEmitter, HostListener } from '@angular/core';
import { XoferService } from 'src/app/servicios/xofer.service';
import { PopupModificarXoferComponent } from '../popup-modificar-xofer/popup-modificar-xofer.component';
import { PopupModificarViatgeComponent } from '../popup-modificar-viatge/popup-modificar-viatge.component';
import { MatDialog } from '@angular/material/dialog';
import { EventosService } from 'src/app/servicios/eventos.service';
import { ViatgesService } from 'src/app/servicios/viatges.service';
import { DateService } from 'src/app/servicios/data.service';
import { MarcadoService } from 'src/app/servicios/marcado.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-taula-principal',
  templateUrl: './taula-principal.component.html',
  styleUrls: ['./taula-principal.component.css']
})
export class TaulaPrincipalComponent {
  @Output() rutaModificada: EventEmitter<any> = new EventEmitter();
  xofers: any = null;
  icones: any = null;
  viatges: any = null;
  dialogOpen = false;
  selectedXofer: any;
  dataAvuiFormatejada: string;
  dataDemaFormatejada: string;
  dataPassatDemaFormatejada: string;
  dataAhirFormatejada: string;
  enviado: boolean | null = null;
  editando: any = null;
  rutes: any = null;

  constructor(private iconesService: IconesService, public marcadoService: MarcadoService, private http: HttpClient, public dateService: DateService, private viatgeService: ViatgesService, private xoferService: XoferService, public dialog: MatDialog, private eventosService: EventosService) {
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
      this.cargarIcones();
    });
    this.cargarIcones();

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

  cargarIcones() {
    this.iconesService.retornarIcones()
    .subscribe((result: any) => {
      this.icones = result;
    });
    console.log(this.icones);

  }

  cargarViatges() {
    this.viatgeService.retornarViatge()
      .subscribe((result: any) => {
        this.viatges = result;
      });
    this.viatgeService.retornarRuta()
      .subscribe((result: any) => {
        this.rutes = result;
      });
    this.cargarIcones();
  }

  openDialog(xofer: any) {
    this.selectedXofer = xofer;
    this.dialogOpen = true;

    console.log(this.selectedXofer.nom);

    const dialogRef = this.dialog.open(PopupModificarXoferComponent, {
      data: { xofer: this.selectedXofer },
      height: '700px',
      width: '1000px',
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
        this.modificarViaje(this.marcadoService.obtenerElementosSuperioresMarcados()[0], null, null);
        this.eliminarRutasVacias();
      }
    }
  }

  eliminarRutasVacias() {
    this.cargarViatges();
    for (const ruta of this.rutes) {
      if (ruta.viatge && ruta.viatge.length === 0) {
        console.log("Dentro del if");

        const endpoint = "http://localhost:8181/Ruta/" + ruta.id;

        if (endpoint) {
          this.eliminarRuta(endpoint).subscribe(
            (response) => {
              console.log('Formulario enviado correctamente');
              this.enviado = true;

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
      //this.editando.viatge = this.editando.push(this.marcadoService.obtenerElementosInferioresMarcados()[0]);
      console.log(typeof this.editando.viatge)
      console.log(this.editando.viatge);

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
        tipus: viaje.tipus,
        data_inicial: viaje.data_inicial,
        n_comanda: viaje.n_comanda,
        dividit: viaje.dividit
      };
    } else {
      requestBody = {
        id: viaje.id,
        id_direccio_origen: {id: +viaje.id_direccio_origen.id},
        id_direccio_desti: {id: +viaje.id_direccio_desti.id},
        comentari: viaje.comentari,
        dia: dia,
        tipus: viaje.tipus,
        id_ruta: {id: +ruta},
        data_inicial: viaje.data_inicial,
        n_comanda: viaje.n_comanda,
        dividit: viaje.dividit
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
      console.log(this.editando.id);

      this.marcadoService.desmarcarRuta();
    } else {
      this.editando = null;
    }
  }

  dejarEditar() {
    this.editando = null;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Verifica si la tecla deseada está presionada
    console.log(event.key);

    if (event.key === 'Backspace' || event.key === 'Delete') { // Cambia 'Enter' a la tecla que desees usar
      // Llama al método que corresponde al evento (click)
      this.eliminar();
    } else if (event.key === 'Enter' && this.editando === null) {
      this.editar();
    } else if (event.key === 'Enter' && this.editando != null) {
      this.dejarEditar();
    }
  }

  eliminarIcona(endpoint: string) {
    const token = window.sessionStorage.getItem("auth-token"); // Reemplaza con el valor real de tu token
    console.log(token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(endpoint, { headers: headers });
  }

  saveIcona(endpoint: string, formData: any) {
    return this.http.post(endpoint, formData);
  }

  canviarIcona(iconaPar: string, data: string, xofer: any) {
    var trobat: boolean = false;
    var icona: any = null;
    var endpoint:string = "";

    for (let iconaPassar of this.icones) {

      console.log(iconaPassar.icona + " " + iconaPar + "\n" + iconaPassar.data + " " + data + "\n" + iconaPassar.id_xofer.id + " " + xofer.id);


        if (iconaPassar.data === data && iconaPassar.id_xofer.id === xofer.id) {
            // Hacer algo con el objeto 'icona' que coincida
            trobat = true;
            icona = iconaPassar;
        }
    }

    console.log(trobat);


    if (trobat) {
      endpoint = "http://localhost:8181/Icones/" + icona.id;

      if (endpoint) {
        this.eliminarIcona(endpoint).subscribe(
          (response) => {
            console.log('Formulario enviado correctamente');
            this.enviado = true;
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

    const requestBody = {
      icona: iconaPar,
      data: data,
      id_xofer: {id: +xofer.id}
    };

    console.log("Request body: " + requestBody);

    endpoint = "http://localhost:8181/Icones";

    if (endpoint) {
      this.saveIcona(endpoint, requestBody).subscribe(
        (response) => {
          console.log('Formulario enviado correctamente');
          this.enviado = true;
          this.eventosService.emitXoferCreated();
          this.cargarIcones();
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

  dividir() {
    this.viatgeService.retornarViatgeUnic(this.marcadoService.obtenerElementosSuperioresMarcados()[0].id)
    .subscribe((viatge: any) => {
      const endpoint = "http://localhost:8181/Viatge/" + viatge.id;
      let requestBody;

      console.log(viatge);

      if (viatge.dividit === 1) {
        requestBody = {
          id: viatge.id,
          id_direccio_origen: { id: +viatge.id_direccio_origen.id },
          id_direccio_desti: { id: +viatge.id_direccio_desti.id },
          comentari: viatge.comentari,
          id_ruta: { id: +viatge.id_ruta.id },
          dia: viatge.dia,
          tipus: viatge.tipus,
          data_inicial: viatge.data_inicial,
          n_comanda: viatge.n_comanda,
          dividit: 0
        };
      } else {
        requestBody = {
          id: viatge.id,
          id_direccio_origen: { id: +viatge.id_direccio_origen.id },
          id_direccio_desti: { id: +viatge.id_direccio_desti.id },
          comentari: viatge.comentari,
          id_ruta: { id: +viatge.id_ruta.id },
          dia: viatge.dia,
          tipus: viatge.tipus,
          data_inicial: viatge.data_inicial,
          n_comanda: viatge.n_comanda,
          dividit: 1
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
    });
  }


  noDisponible(xofer:any, dia:string) {
    for (const noDisponible of xofer.xofer_no_disponible) {
      if (noDisponible.dia === dia) {
        return true;
      }
    }

    return false;
  }

  noDisponibleCamio(xofer:any, dia:string) {
    for (const noDisponible of xofer.id_camio.camio_no_disponible) {
      if (noDisponible.dia === dia) {
        return true;
      }
    }

    for (const noDisponible of xofer.id_remolc.poden_estar_remolc) {
      if (noDisponible.dia === dia) {
        return true;
      }
    }

    return false;
  }
}

