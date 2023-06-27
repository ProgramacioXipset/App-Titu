import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CamioService } from 'src/app/servicios/camio.service';
import { RemolcService } from 'src/app/servicios/remolc.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';

const dniPattern = /^[0-9]{8}[A-Za-z]$/;
const telPattern = /^[0-9]{9}$/

@Component({
  selector: 'app-popup-modificar-xofer',
  templateUrl: './popup-modificar-xofer.component.html',
  styleUrls: ['./popup-modificar-xofer.component.css']
})
export class PopupModificarXoferComponent {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  camioSeleccionat = new FormControl();
  remolcSeleccionat = new FormControl();
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
    public dialog: MatDialog) {
    // Accede a los datos del diálogo a través de la propiedad 'data'
    console.log(this.data.xofer);
    this.nomControl = new FormControl(this.data.xofer.nom, Validators.required);
    this.cognomControl = new FormControl(this.data.xofer.cognoms, Validators.required);
    this.telefonControl = new FormControl(this.data.xofer.telefon, Validators.pattern(telPattern));
    this.emailControl = new FormControl(this.data.xofer.email, Validators.email);
    this.dniControl = new FormControl(this.data.xofer.dni, Validators.pattern(dniPattern));

    if(this.data.xofer.id_camio && this.data.xofer.id_remolc) {
      this.camioSeleccionat.setValue(this.data.xofer.id_camio.matricula);
      this.remolcSeleccionat.setValue(this.data.xofer.id_remolc.matricula);
    }

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

      // console.log(
      //   "id" + this.data.xofer.id + "," +
      //   "nom: " + nomValue + "," +
      //   "cognoms: " + cognomValue + "," +
      //   "telefon: " + telefonValue + "," +
      //   "email: " + emailValue + "," +
      //   "dni: " + dniValue + "," +
      //   "id_camio: {" + this.camioSeleccionat.value + "}," +
      //   "id_remolc: {" + this.remolcSeleccionat.value + "}"
      // );

      // console.log(endpoint + " " + nomValue + " " + cognomValue + " " + telefonValue + " " + emailValue + " " + dniValue);

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
            this.options.reset();
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
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(endpoint, formData, { headers: headers });
  }
}
