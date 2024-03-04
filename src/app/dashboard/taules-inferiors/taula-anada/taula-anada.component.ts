import { Component, Input } from '@angular/core';
import { AnadaService } from 'src/app/servicios/anada.service';
import { EventosService } from 'src/app/servicios/eventos.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupModificarViatgeComponent } from '../../popup-modificar-viatge/popup-modificar-viatge.component';
import { MarcadoService } from 'src/app/servicios/marcado.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-taula-anada',
  templateUrl: './taula-anada.component.html',
  styleUrls: ['./taula-anada.component.css']
})
export class TaulaAnadaComponent {
  @Input() fecha: string = "";
  anades: any[] = [];
  dialogOpen = false;
  selectedAnada: any;

  constructor(private http: HttpClient, public marcadoService: MarcadoService, private anadaService:AnadaService, private eventosService: EventosService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.cargarAnada();
    this.eventosService.viatgeCreated$.subscribe(() => {
      this.cargarAnada(); // Actualiza los xofers cuando se crea uno nuevo
    });
    this.eventosService.viatgeDeleted$.subscribe(() => {
      this.cargarAnada(); // Actualiza los xofers cuando se crea uno nuevo
    });
    console.log("Fecha: " + this.fecha);

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
      height: '600px',
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

  updateFormData(endpoint: string, formData: any) {
    const token = window.sessionStorage.getItem("auth-token"); // Reemplaza con el valor real de tu token

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(endpoint, formData, { headers: headers });
  }

  baixarViatge(viatge: any) {
    this.anades.sort((a: any, b: any) => b.ordre - a.ordre);

    let ordreInferior = Infinity;
    let idInferior = 0;

    for (const anadaInferior of this.anades) {
      const diferencia = Math.abs(anadaInferior.ordre - viatge.ordre);

      if (diferencia < Math.abs(ordreInferior - viatge.ordre) && diferencia != 0) {
        ordreInferior = anadaInferior.ordre;
        idInferior = anadaInferior.id;
      } else {
        break;
      }
    }

    for (const anadaInferior of this.anades) {
      if (anadaInferior.id === idInferior) {
        var endpoint = "http://localhost:8181/Viatge/" + anadaInferior.id;

        var requestBody = {
          id: anadaInferior.id,
          id_direccio_origen: { id: +anadaInferior.id_direccio_origen.id },
          id_direccio_desti: { id: +anadaInferior.id_direccio_desti.id },
          id_ruta: anadaInferior.id_ruta ? { id: +anadaInferior.id_ruta.id } : null,
          comentari: anadaInferior.comentari,
          externa: anadaInferior.externa,
          tipus: anadaInferior.tipus,
          data_inicial: anadaInferior.data_inicial,
          n_comanda: anadaInferior.n_comanda,
          amagat: anadaInferior.amagat,
          ordre: +viatge.ordre
        };

        console.log(requestBody);

        if (endpoint) {
          this.updateFormData(endpoint, requestBody).subscribe(
            (response) => {
              console.log('Formulario enviado correctamente');
            },
            (error) => {
              console.error('Error al enviar el formulario:', error);
            }
          );
        } else {
          console.error('Endpoint no válido');
        }

        endpoint = "http://localhost:8181/Viatge/" + viatge.id;

        requestBody = {
          id: viatge.id,
          id_direccio_origen: { id: +viatge.id_direccio_origen.id },
          id_direccio_desti: { id: +viatge.id_direccio_desti.id },
          id_ruta: viatge.id_ruta ? { id: +viatge.id_ruta.id } : null,
          comentari: viatge.comentari,
          externa: viatge.externa,
          tipus: viatge.tipus,
          data_inicial: viatge.data_inicial,
          n_comanda: viatge.n_comanda,
          amagat: viatge.amagat,
          ordre: +anadaInferior.ordre
        };

        console.log(requestBody);

        if (endpoint) {
          this.updateFormData(endpoint, requestBody).subscribe(
            (response) => {
              console.log('Formulario enviado correctamente');
              this.cargarAnada();
            },
            (error) => {
              console.error('Error al enviar el formulario:', error);
            }
          );
        } else {
          console.error('Endpoint no válido');
        }
      }
    }
  }

  pujarViatge(viatge: any) {
    this.anades.sort((a: any, b: any) => a.ordre - b.ordre);

    let ordreSuperior = Infinity;
    let idSuperior = 0;

    for (const anadaSuperior of this.anades) {
      const diferencia = Math.abs(anadaSuperior.ordre - viatge.ordre);

      if (diferencia < Math.abs(ordreSuperior - viatge.ordre) && diferencia != 0) {
        ordreSuperior = anadaSuperior.ordre;
        idSuperior = anadaSuperior.id;
      } else {
        break;
      }
    }

    for (const anadaSuperior of this.anades) {
      if (anadaSuperior.id === idSuperior) {
        var endpoint = "http://localhost:8181/Viatge/" + anadaSuperior.id;

        var requestBody = {
          id: anadaSuperior.id,
          id_direccio_origen: { id: +anadaSuperior.id_direccio_origen.id },
          id_direccio_desti: { id: +anadaSuperior.id_direccio_desti.id },
          id_ruta: anadaSuperior.id_ruta ? { id: +anadaSuperior.id_ruta.id } : null,
          comentari: anadaSuperior.comentari,
          externa: anadaSuperior.externa,
          tipus: anadaSuperior.tipus,
          data_inicial: anadaSuperior.data_inicial,
          n_comanda: anadaSuperior.n_comanda,
          amagat: anadaSuperior.amagat,
          ordre: +viatge.ordre
        };

        console.log(requestBody);

        if (endpoint) {
          this.updateFormData(endpoint, requestBody).subscribe(
            (response) => {
              console.log('Formulario enviado correctamente');
            },
            (error) => {
              console.error('Error al enviar el formulario:', error);
            }
          );
        } else {
          console.error('Endpoint no válido');
        }

        endpoint = "http://localhost:8181/Viatge/" + viatge.id;

        requestBody = {
          id: viatge.id,
          id_direccio_origen: { id: +viatge.id_direccio_origen.id },
          id_direccio_desti: { id: +viatge.id_direccio_desti.id },
          id_ruta: viatge.id_ruta ? { id: +viatge.id_ruta.id } : null,
          comentari: viatge.comentari,
          externa: viatge.externa,
          tipus: viatge.tipus,
          data_inicial: viatge.data_inicial,
          n_comanda: viatge.n_comanda,
          amagat: viatge.amagat,
          ordre: +anadaSuperior.ordre
        };

        console.log(requestBody);

        if (endpoint) {
          this.updateFormData(endpoint, requestBody).subscribe(
            (response) => {
              console.log('Formulario enviado correctamente');
              this.cargarAnada();
            },
            (error) => {
              console.error('Error al enviar el formulario:', error);
            }
          );
        } else {
          console.error('Endpoint no válido');
        }
      }
    }
  }
}
