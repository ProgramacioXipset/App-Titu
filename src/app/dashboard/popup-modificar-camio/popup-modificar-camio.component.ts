import { Component, Inject, EventEmitter, Output, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { DateService } from 'src/app/servicios/data.service';

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

  camionsNoDisponibles:any = null;
  public reactiveControl;
  modelPredefined: Date[] = [];

  public dynamicName = 'reactiveFormControl';
  public reactiveForm = new UntypedFormGroup({
    [this.dynamicName]: new UntypedFormControl(this.modelPredefined)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,
    public dataService: DateService) {

    this.camionsNoDisponibles = this.data.camio.camio_no_disponible;

    this.pasarADateYAssignar();
    this.reactiveControl = new UntypedFormControl(this.modelPredefined);

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
    const endpoint = "http://localhost:8181/Camio/" + this.data.camio.id;

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
    const endpoint = "http://localhost:8181/Camio/" + this.data.camio.id;

    const confirmed = confirm('Segur que vols eliminar aquest camió?');

    if (confirmed) {
      if (this.data.xofer.id_camio.id === this.data.camio.id) {
        const formData = this.options.value;

        const nomValue = this.data.xofer.nom;
        const cognomValue = this.data.xofer.cognoms;
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
          this.updateFormData("http://localhost:8181/Xofer/" + this.data.xofer.id, requestBody).subscribe(
            (response) => {
              console.log('Formulario enviado correctamente');
              this.enviado = true;
              this.camionModificado.emit();
              this.xoferJaModificat(endpoint);
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

  xoferJaModificat(endpoint: string) {
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

  eliminarCamio(endpoint: string) {
    const token = window.sessionStorage.getItem("auth-token"); // Reemplaza con el valor real de tu token
    console.log(token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(endpoint, { headers: headers });
  }

  pasarADateYAssignar() {
    console.log(this.camionsNoDisponibles);

    for (const xoferNoDisponible of this.camionsNoDisponibles) {
      const [year, month, day] = xoferNoDisponible.dia.split("-");
      const fecha = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      this.modelPredefined.push(fecha)
    }
  }

  actualizarNoDisponible() {
    console.log(this.reactiveControl.value);

    var endpoint = "http://localhost:8181/CamioNoDisponible/Camio/" + this.data.camio.id;

    if (endpoint) {
      this.eliminarCamio(endpoint).subscribe(
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

    endpoint = "http://localhost:8181/CamioNoDisponible";

    for (const fecha of this.reactiveControl.value) {

      const requestBody = {
        camio: { id: +this.data.camio.id },
        dia: this.formatDate(fecha)
      };

      console.log(requestBody);


      if (endpoint) {
        this.saveFormData(endpoint, requestBody).subscribe(
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

  private formatDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  saveFormData(endpoint: string, formData: any) {
    return this.http.post(endpoint, formData);
  }

  openCamio(): void {

  }

  openRemolc(): void {

  }

  openModificarCamio(): void {

  }
}
