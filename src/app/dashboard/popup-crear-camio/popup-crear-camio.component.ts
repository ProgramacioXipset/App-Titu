import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { DireccioService } from 'src/app/servicios/direccio.service';
import { HttpClient } from '@angular/common/http';

const matriculaPattern = /^[0-9]{4}[A-Za-z]{3}$/;

@Component({
  selector: 'app-popup-crear-camio',
  templateUrl: './popup-crear-camio.component.html',
  styleUrls: ['./popup-crear-camio.component.css']
})
export class PopupCrearCamioComponent {

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  matriculaControl = new FormControl('', Validators.pattern(matriculaPattern));
  marcaModelControl = new FormControl();
  options: FormGroup;
  direccions: any = null;
  enviado: boolean | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private direccioService: DireccioService,
    private http: HttpClient
  ) {
    this.options = this._formBuilder.group({
      floatLabel: this.floatLabelControl,
      matriculaControl: this.matriculaControl,
      marcaModelControl: this.marcaModelControl
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
      const endpoint = "https://app-titu.herokuapp.com/Camio";

      const matriculaValue = this.matriculaControl.value;
      const marcaModelValue = this.marcaModelControl.value;
      console.log(endpoint + " " + matriculaValue + " " + marcaModelValue);

      const requestBody = {
        matricula: matriculaValue,
        marca_model: marcaModelValue 
      };

      if (endpoint) {
        this.saveFormData(endpoint, requestBody).subscribe(
          (response) => {
            console.log('Formulario enviado correctamente');
            // Realizar acciones adicionales después de guardar los datos en la base de datos
            this.enviado = true;
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

  saveFormData(endpoint: string, formData: any) {
    return this.http.post(endpoint, formData);
  }
}
