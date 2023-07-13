import { Component, Inject, EventEmitter, Output, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';

const matriculaPattern = /^[0-9]{4}[A-Za-z]{3}$/;

@Component({
  selector: 'app-popup-modificar-remolc',
  templateUrl: './popup-modificar-remolc.component.html',
  styleUrls: ['./popup-modificar-remolc.component.css']
})
export class PopupModificarRemolcComponent {
  @Output() remolcModificado: EventEmitter<any> = new EventEmitter();
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  enviado: boolean | null = null;
  options: FormGroup;
  matriculaControl = new FormControl(this.data.remolc.matricula, Validators.pattern(matriculaPattern));

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog) {

    this.options = this._formBuilder.group({
      floatLabel: this.floatLabelControl,
      matriculaControl: this.matriculaControl
    });
  }
    ngOnInit(): void {
      console.log(this.data.remolc.matricula);
      
  }

  submitForm() {
    const endpoint = "https://app-titu.herokuapp.com/Remolc/" + this.data.remolc.id;

    const matriculaValue = this.matriculaControl.value;

    const requestBody = {
      id: this.data.remolc.id,
      matricula: matriculaValue
    };

    console.log(requestBody);
    if (endpoint) {
      this.updateFormData(endpoint, requestBody).subscribe(
        (response) => {
          console.log('Formulario enviado correctamente');
          this.enviado = true;
          this.remolcModificado.emit();
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
    const endpoint = "https://app-titu.herokuapp.com/Remolc/" + this.data.remolc.id;

    const confirmed = confirm('Segur que vols eliminar aquest camió?');

    if (confirmed) {
      if (this.data.xofer.id_remolc.id === this.data.remolc.id) {
        const formData = this.options.value;
      
        const nomValue = this.data.xofer.nom;
        const cognomValue = this.data.xofer.cognom;
        const telefonValue = this.data.xofer.telefon;
        const emailValue = this.data.xofer.email;
        const dniValue = this.data.xofer.dni;

        const requestBody = {
          id: this.data.xofer.id,
          nom: nomValue,
          cognoms: cognomValue,
          telefon: telefonValue,
          email: emailValue,
          dni: dniValue,
          id_camio: { id: 1 },
          id_remolc: { id: +this.data.xofer.id_remolc.id }
        };

        console.log(requestBody);
        

        if (endpoint) {
          this.updateFormData("https://app-titu.herokuapp.com/Xofer/" + this.data.xofer.id, requestBody).subscribe(
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

      if (endpoint) {
        this.eliminarRemolc(endpoint).subscribe(
          (response) => {
            console.log('Formulario enviado correctamente');
            this.enviado = true;
            this.options.reset();
            this.remolcModificado.emit();            
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

  eliminarRemolc(endpoint: string) {
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

  openModificarRemolc(): void {
    
  }
}
