import { Component, Inject, EventEmitter, Output, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';

const matriculaPattern = /^[0-9]{4}[A-Za-z]{3}$/;

@Component({
  selector: 'app-popup-modificar-camio',
  templateUrl: './popup-modificar-camio.component.html',
  styleUrls: ['./popup-modificar-camio.component.css']
})
export class PopupModificarCamioComponent {
  @Output() camionModificado: EventEmitter<any> = new EventEmitter();
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  enviado: boolean | null = null;
  options: FormGroup;
  matriculaControl = new FormControl(this.data.camio.matricula, Validators.pattern(matriculaPattern));
  marcaModelControl = new FormControl(this.data.camio.marca_model);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog) {

    this.options = this._formBuilder.group({
      floatLabel: this.floatLabelControl,
      matriculaControl: this.matriculaControl,
      marcaModelControl: this.marcaModelControl
    });
  }
    ngOnInit(): void {
      console.log(this.data.camio.matricula);
      
  }

  submitForm() {
    const endpoint = "https://app-titu.herokuapp.com/Camio/" + this.data.camio.id;

    const matriculaValue = this.matriculaControl.value;
    const marcaModelvalue = this.marcaModelControl.value;

    const requestBody = {
      id: this.data.camio.id,
      matricula: matriculaValue,
      marca_model: marcaModelvalue
    };

    console.log(requestBody);
    if (endpoint) {
      this.updateFormData(endpoint, requestBody).subscribe(
        (response) => {
          console.log('Formulario enviado correctamente');
          this.enviado = true;
          this.camionModificado.emit();
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
  

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  updateFormData(endpoint: string, formData: any) {
    const token = window.sessionStorage.getItem("auth-token"); // Reemplaza con el valor real de tu token
    console.log(token);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(endpoint, formData, { headers: headers });
  }

  submitDelete() {
    const endpoint = "https://app-titu.herokuapp.com/Camio/" + this.data.camio.id;

    const confirmed = confirm('Segur que vols eliminar aquest camió?');

    if (confirmed) {
      if (endpoint) {
        this.eliminarCamio(endpoint).subscribe(
          (response) => {
            console.log('Formulario enviado correctamente');
            this.enviado = true;
            this.options.reset();
            this.camionModificado.emit();            
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

  eliminarCamio(endpoint: string) {
    const token = window.sessionStorage.getItem("auth-token"); // Reemplaza con el valor real de tu token
    console.log(token);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(endpoint, { headers: headers });
  }

  openCamio(): void {
    
  }

  openRemolc(): void {
    
  }

  openModificarCamio(): void {
    
  }
}
