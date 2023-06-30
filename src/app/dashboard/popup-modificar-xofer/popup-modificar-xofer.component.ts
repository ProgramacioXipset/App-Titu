import { Component, Inject, EventEmitter, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CamioService } from 'src/app/servicios/camio.service';
import { RemolcService } from 'src/app/servicios/remolc.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { PopupCrearCamioComponent } from '../popup-crear-camio/popup-crear-camio.component';
import { PopupCrearRemolcComponent } from '../popup-crear-remolc/popup-crear-remolc.component';
import { PopupModificarCamioComponent } from '../popup-modificar-camio/popup-modificar-camio.component';
import { EventosService } from 'src/app/servicios/eventos.service';
import { MatSelect } from '@angular/material/select';

const dniPattern = /^[0-9]{8}[A-Za-z]$/;
const telPattern = /^[0-9]{9}$/

@Component({
  selector: 'app-popup-modificar-xofer',
  templateUrl: './popup-modificar-xofer.component.html',
  styleUrls: ['./popup-modificar-xofer.component.css']
})
export class PopupModificarXoferComponent {
  @ViewChild('selectCamiones') selectCamiones!: MatSelect;
  @Output() xoferModificado: EventEmitter<any> = new EventEmitter();
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  camioSeleccionat = new FormControl(this.data.xofer.id_camio?.id || 1);
  remolcSeleccionat = new FormControl(this.data.xofer.id_remolc?.id || 1);
  nomControl;
  cognomControl;
  telefonControl;
  emailControl;
  dniControl;
  options: FormGroup;
  camions: any = null;
  remolcs: any = null;
  enviado: boolean | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private camioService: CamioService,
    private remolcService: RemolcService,
    private http: HttpClient,
    public dialog: MatDialog,
    private eventosService: EventosService) {
    // Accede a los datos del diálogo a través de la propiedad 'data'
    console.log(this.data.xofer);
    this.nomControl = new FormControl(this.data.xofer.nom, Validators.required);
    this.cognomControl = new FormControl(this.data.xofer.cognoms, Validators.required);
    this.telefonControl = new FormControl(this.data.xofer.telefon, Validators.pattern(telPattern));
    this.emailControl = new FormControl(this.data.xofer.email, Validators.email);
    this.dniControl = new FormControl(this.data.xofer.dni, Validators.pattern(dniPattern));

    this.options = this._formBuilder.group({
      nomControl: this.nomControl,
      cognomControl: this.cognomControl,
      telefonControl: this.telefonControl,
      emailControl: this.emailControl,
      dniControl: this.dniControl
    });
  }
  ngOnInit(): void {
    this.camioService.retornarCamio().subscribe((result: any) => {
      this.camions = result;
    });
    this.remolcService.retornarRemolc().subscribe((result: any) => {
      this.remolcs = result;
    });

    this.eventosService.camioCreated$.subscribe(() => {
      this.recargar(); // Actualiza los xofers cuando se crea uno nuevo
    });
  }

  submitForm() {
    if (this.options.valid) {
      const formData = this.options.value;
      const endpoint = "https://app-titu.herokuapp.com/Xofer/" + this.data.xofer.id;

      const nomValue = this.nomControl.value;
      const cognomValue = this.cognomControl.value;
      const telefonValue = this.telefonControl.value;
      const emailValue = this.emailControl.value;
      const dniValue = this.dniControl.value;

      const requestBody = {
        id: this.data.xofer.id,
        nom: nomValue,
        cognoms: cognomValue,
        telefon: telefonValue,
        email: emailValue,
        dni: dniValue,
        id_camio: { id: +this.camioSeleccionat.value },
        id_remolc: { id: +this.remolcSeleccionat.value }
      };

      console.log(requestBody);
      

      if (endpoint) {
        this.updateFormData(endpoint, requestBody).subscribe(
          (response) => {
            console.log('Formulario enviado correctamente');
            this.enviado = true;
            this.xoferModificado.emit();
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
    const endpoint = "https://app-titu.herokuapp.com/Xofer/" + this.data.xofer.id;

    const confirmed = confirm('Segur que vols eliminar aquest xofer?');
  
    if (confirmed) {
      if (endpoint) {
        this.eliminarXofer(endpoint).subscribe(
          (response) => {
            console.log('Formulario enviado correctamente');
            this.enviado = true;
            this.options.reset();
            this.xoferModificado.emit();
            this.dialog.closeAll();
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

  eliminarXofer(endpoint: string) {
    const token = window.sessionStorage.getItem("auth-token"); // Reemplaza con el valor real de tu token
    console.log(token);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(endpoint, { headers: headers });
  }

  openCamio(): void {
    const dialogRef = this.dialog.open(PopupCrearCamioComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRemolc(): void {
    const dialogRef = this.dialog.open(PopupCrearRemolcComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openModificarCamio(): void {
    const valor = this.camions.findIndex((element: { id: any; }) => element.id === this.camioSeleccionat.value);
    const camionEnviar = this.camions[valor];

    console.log(camionEnviar);    
    
    const dialogRef = this.dialog.open(PopupModificarCamioComponent, {
      data: {camio: camionEnviar },
      height: '500px',
      width: '700px',
    });

    dialogRef.componentInstance.camionModificado.subscribe((camionModificado) => {
      // Actualizar el valor del select
      this.camioSeleccionat.setValue(camionModificado.id);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.recargar();
      // Actualizar el valor seleccionado y la validez del select
      // this.selectCamiones.writeValue(requestBody.id);
      // this.selectCamiones.updateValueAndValidity();
    });
  }

  recargar() {
    this.camioService.retornarCamio()
      .subscribe((result: any) => {
        this.camions = result;
      });
  }
}
