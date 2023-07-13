import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { DireccioService } from 'src/app/servicios/direccio.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-popup-crear-direccio',
  templateUrl: './popup-crear-direccio.component.html',
  styleUrls: ['./popup-crear-direccio.component.css']
})
export class PopupCrearDireccioComponent {
  hideRequiredControl = new FormControl(false);
  adrecaControl = new FormControl();
  poblacioControl = new FormControl();
  cpostalControl = new FormControl();
  options: FormGroup;
  direccions: any = null;
  enviado: boolean | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private direccioService: DireccioService,
    private http: HttpClient
  ) {
    this.options = this._formBuilder.group({
      adrecaControl: this.adrecaControl,
      poblacioControl: this.poblacioControl,
      cpostalControl: this.cpostalControl
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.direccioService.retornarDireccio().subscribe((result: any) => {
      this.direccions = result;
    });
  }

  submitForm() {
    if (this.options.valid) {
      const formData = this.options.value;
      const endpoint = "https://app-titu.herokuapp.com/Direccio";

      const adrecaValue = this.adrecaControl.value;
      const poblacioValue = this.poblacioControl.value;
      const cpostalValue = this.cpostalControl.value;
      console.log(endpoint + " " + adrecaValue + " " + poblacioValue + " " + cpostalValue);

      const requestBody = {
        adreca: adrecaValue,
        poblacio: poblacioValue,
        codi_postal: cpostalValue
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
