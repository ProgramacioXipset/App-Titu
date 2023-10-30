import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { DireccioService } from 'src/app/servicios/direccio.service';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { PopupCrearDireccioComponent } from '../popup-crear-direccio/popup-crear-direccio.component';
import { EventosService } from 'src/app/servicios/eventos.service';

@Component({
  selector: 'app-popup-crear-viatge',
  templateUrl: './popup-crear-viatge.component.html',
  styleUrls: ['./popup-crear-viatge.component.css'],
})
export class PopupCrearViatgeComponent {
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  origenSeleccionat = new FormControl();
  destiSeleccionat = new FormControl();
  comentariControl = new FormControl();
  comandaControl = new FormControl();
  selectedDate = new FormControl();
  options: FormGroup;
  direccions: any = null;
  enviado: boolean | null = null;
  data_inicial: string = "";

  constructor(
    private _formBuilder: FormBuilder,
    private direccioService: DireccioService,
    private http: HttpClient,
    public dialog: MatDialog,
    private eventosService: EventosService
  ) {
    this.options = this._formBuilder.group({
      floatLabel: this.floatLabelControl,
      origenSeleccionat: this.origenSeleccionat,
      destiSeleccionat: this.destiSeleccionat,
      comentariControl: this.comentariControl
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupCrearDireccioComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.direccioService.retornarDireccio().subscribe((result: any) => {
      this.direccions = result;
    });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  submitForm() {
    if (this.options.valid) {
      const formData = this.options.value;
      const endpoint = "http://localhost:8181/Viatge";

      const origenValue = this.origenSeleccionat.value;
      const destiValue = this.destiSeleccionat.value;
      const comentariValue = this.comentariControl.value;
      console.log(endpoint + " " + origenValue + " " + destiValue + " " + comentariValue);

      const requestBody = {
        id_direccio_origen: { id: origenValue },
        id_direccio_desti: { id: destiValue },
        comentari: comentariValue,
        tipus: this.getTipus(formData.floatLabel),
        data_inicial: this.data_inicial,
        n_comanda: this.comandaControl.value
      };

      if (endpoint) {
        this.saveFormData(endpoint, requestBody).subscribe(
          (response) => {
            console.log('Formulario enviado correctamente');
            // Realizar acciones adicionales después de guardar los datos en la base de datos
            this.enviado = true;
            this.eventosService.emitViatgeCreated();
            this.options.reset();
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
    }
  }

  getTipus(radioValue: string | undefined): number | null {
    let tipus: number = 0;

    if (radioValue === 'Anada') {
      tipus = 2;
    } else if (radioValue === 'Tornada') {
      tipus = 3;
    } else if (radioValue === 'Avui X Avui') {
      tipus = 1;
    }

    return tipus;
  }

  saveFormData(endpoint: string, formData: any) {
    return this.http.post(endpoint, formData);
  }

  setDate(selectedDate: Date) {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Añade 0 si es necesario
    const day = selectedDate.getDate().toString().padStart(2, '0'); // Añade 0 si es necesario

    this.data_inicial = `${year}-${month}-${day}`;
  }
}
