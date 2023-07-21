import { Component, Inject, EventEmitter, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
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
import { PopupModificarRemolcComponent } from '../popup-modificar-remolc/popup-modificar-remolc.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-popup-modificar-viatge',
  templateUrl: './popup-modificar-viatge.component.html',
  styleUrls: ['./popup-modificar-viatge.component.css']
})
export class PopupModificarViatgeComponent {
  @ViewChild('selectCamiones') selectCamiones!: MatSelect;
  @Output() xoferModificado: EventEmitter<any> = new EventEmitter();
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  origenControl;
  destiControl;
  options: FormGroup;
  camions: any = null;
  remolcs: any = null;
  enviado: boolean | null = null;
  extern = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private camioService: CamioService,
    private remolcService: RemolcService,
    private http: HttpClient,
    public dialog: MatDialog,
    private eventosService: EventosService) {
    // Accede a los datos del diálogo a través de la propiedad 'data'
    console.log(this.data.xofer);
    this.origenControl = new FormControl(/*this.data.xofer.nom, Validators.required*/);
    this.destiControl = new FormControl(/*this.data.xofer.telefon, Validators.pattern(telPattern)*/);

    this.options = this._formBuilder.group({
      origenControl: this.origenControl,
      telefonControl: this.destiControl
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

      const origenValue = this.origenControl.value;
      const destiValue = this.destiControl.value;

      const requestBody = {
        id: this.data.xofer.id,
        origen: origenValue,
        telefon: destiValue,
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
      this.recargar();
    });
  }

  openRemolc(): void {
    const dialogRef = this.dialog.open(PopupCrearRemolcComponent, {
      height: '500px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.recargar();
    });
  }

  recargar() {
    this.camioService.retornarCamio()
      .subscribe((result: any) => {
        this.camions = result;
      });

    this.remolcService.retornarRemolc()
      .subscribe((result: any) => {
        this.remolcs = result;
    });
  }
}
