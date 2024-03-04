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
  amagarControl;
  selectedDate;
  comentariControl;
  comandaControl;
  options: FormGroup;
  camions: any = null;
  remolcs: any = null;
  enviado: boolean | null = null;
  externControl;
  data_inicial: string = this.data.viatge.data_inicial;

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
    this.comandaControl = new FormControl(this.data.viatge.n_comanda);
    this.selectedDate = new FormControl(this.data.viatge.data_inicial);
    this.amagarControl = new FormControl(this.data.viatge.amagat);

    this.options = this._formBuilder.group({
      comentariControl: this.comentariControl,
      externControl: this.externControl,
    });
  }
  ngOnInit(): void {


  }

  obtenerTipo() {

    var tipo;

    switch (this.data.tipus) {
      case "anada":
        tipo = 2;
        break;
      case "tornada":
        tipo = 3;
        break;
      case "avuiXAvui":
        tipo = 1;
        break;
      default:
        tipo = this.data.viatge.tipus;

    }

    return tipo;
  }

  submitForm() {
    console.log("Es: " + this.options.valid);

    console.log(this.data.viatge.comentari);
    if (this.options.valid) {
      const formData = this.options.value;
      var endpoint = "http://localhost:8181/Viatge/" + this.data.viatge.id;

      const comentariValue = this.comentariControl.value;
      var varExtern;
      var varAmagat;

      if (this.externControl.value === "") {
        varExtern = null;
      } else {
        varExtern = this.externControl.value;
      }

      if (this.amagarControl.value) {
        varAmagat = 1;
      } else {
        varAmagat = 0;
      }

      const requestBody = {
        id: this.data.viatge.id,
        id_direccio_origen: { id: +this.data.viatge.id_direccio_origen.id },
        id_direccio_desti: { id: +this.data.viatge.id_direccio_desti.id },
        id_ruta: this.data.viatge.id_ruta ? { id: +this.data.viatge.id_ruta.id } : null,
        comentari: comentariValue,
        externa: varExtern,
        dia: this.selectedDate.value,
        tipus: this.obtenerTipo(),
        data_inicial: this.data_inicial,
        n_comanda: this.comandaControl.value,
        amagat: varAmagat,
        ordre: this.data.viatge.ordre
      };

      console.log("Request");


      if (endpoint) {
        this.updateFormData(endpoint, requestBody).subscribe(
          (response) => {
            console.log('Formulario enviado correctamente');
            this.enviado = true;
            this.xoferModificado.emit();
            this.eventosService.emitViatgeCreated();
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

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(endpoint, formData, { headers: headers });
  }

  submitDelete() {
    const endpoint = "http://localhost:8181/Viatge/" + this.data.viatge.id;

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

  setDate(selectedDate: Date) {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Añade 0 si es necesario
    const day = selectedDate.getDate().toString().padStart(2, '0'); // Añade 0 si es necesario

    this.data_inicial = `${year}-${month}-${day}`;
  }
}
