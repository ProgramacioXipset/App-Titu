import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { DireccioService } from 'src/app/servicios/direccio.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-popup-crear-remolc',
  templateUrl: './popup-crear-remolc.component.html',
  styleUrls: ['./popup-crear-remolc.component.css']
})
export class PopupCrearRemolcComponent {
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  matriculaControl = new FormControl('');
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
      matriculaControl: this.matriculaControl
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
      const endpoint = "http://localhost:8181/Remolc";

      const matriculaValue = this.matriculaControl.value;
      console.log(endpoint + " " + matriculaValue);

      const requestBody = {
        matricula: matriculaValue
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
