import { Component, Inject, EventEmitter, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CamioService } from 'src/app/servicios/camio.service';
import { RemolcService } from 'src/app/servicios/remolc.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { EventosService } from 'src/app/servicios/eventos.service';
import { MatSelect } from '@angular/material/select';

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
  comentariControl;
  options: FormGroup;
  camions: any = null;
  remolcs: any = null;
  enviado: boolean | null = null;
  externControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private camioService: CamioService,
    private remolcService: RemolcService,
    private http: HttpClient,
    public dialog: MatDialog,
    private eventosService: EventosService) {
    // Accede a los datos del diálogo a través de la propiedad 'data'
    console.log(this.data.xofer);
    this.comentariControl = new FormControl(this.data.viatge.comentari);
    this.externControl = new FormControl(this.data.viatge.externa);

    this.options = this._formBuilder.group({
      comentariControl: this.comentariControl,
      externControl: this.externControl,
    });
  }
  ngOnInit(): void {


  }

  obtenerEndpoint() {

    var endpoint;

    switch (this.data.tipus) {
      case "anada":
        endpoint = "https://app-titu.herokuapp.com/Anada/" + this.data.viatge.id;
        break;
      case "tornada":
        endpoint = "https://app-titu.herokuapp.com/Tornada/" + this.data.viatge.id;
        break;
      case "avuiXAvui":
        endpoint = "https://app-titu.herokuapp.com/AvuiXAvui/" + this.data.viatge.id;
        break;
      default:
        console.log("No se ha encontrado el tipo de viaje");

    }

    return endpoint;
  }

  submitForm() {
    console.log(this.data.viatge.comentari);
    if (this.options.valid) {
      const formData = this.options.value;
      var endpoint = this.obtenerEndpoint();

      const comentariValue = this.comentariControl.value;
      var externValue

      if (this.externControl.value){
        externValue = 1;
      } else {
        externValue = 0
      }

      console.log(+this.data.viatge.id_direccio_origen.id + " " + endpoint + " " + comentariValue + " " + externValue);


      const requestBody = {
        id: this.data.viatge.id,
        id_direccio_origen: { id: +this.data.viatge.id_direccio_origen.id },
        id_direccio_desti: { id: +this.data.viatge.id_direccio_desti.id },
        comentari: comentariValue,
        externa: externValue
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
    const endpoint = this.obtenerEndpoint();

    const confirmed = confirm('Segur que vols eliminar aquest viatge?');

    if (confirmed) {
      if (endpoint) {
        this.eliminarViatge(endpoint).subscribe(
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

  eliminarViatge(endpoint: string) {
    const token = window.sessionStorage.getItem("auth-token"); // Reemplaza con el valor real de tu token
    console.log(token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(endpoint, { headers: headers });
  }
}
