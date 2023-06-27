import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DireccioService } from 'src/app/servicios/direccio.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

const dniPattern = /^[0-9]{8}[A-Za-z]$/;
const telPattern = /^[0-9]{9}$/

@Component({
  selector: 'app-popup-crear-xofer',
  templateUrl: './popup-crear-xofer.component.html',
  styleUrls: ['./popup-crear-xofer.component.css']
})
export class PopupCrearXoferComponent {
  hideRequiredControl = new FormControl(false);
  nomControl = new FormControl('', Validators.required);
  cognomControl = new FormControl('', Validators.required);
  telefonControl = new FormControl('', Validators.pattern(telPattern));
  emailControl = new FormControl('',  Validators.email);
  dniControl = new FormControl('', Validators.pattern(dniPattern));
  options: FormGroup;
  direccions: any = null;
  enviado: boolean | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private direccioService: DireccioService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.options = this._formBuilder.group({
      nomControl: this.nomControl,
      cognomControl: this.cognomControl,
      telefonControl: this.telefonControl,
      emailControl: this.emailControl,
      dniControl: this.dniControl
    });
  }

  ngOnInit(): void {
    this.direccioService.retornarDireccio().subscribe((result: any) => {
      this.direccions = result;
    });
  }

  submitForm() {
    if (this.options.valid) {
      const formData = this.options.value;
      const endpoint = "https://app-titu.herokuapp.com/Xofer";

      const nomValue = this.nomControl.value;
      const cognomValue = this.cognomControl.value;
      const telefonValue = this.telefonControl.value;
      const emailValue = this.emailControl.value;
      const dniValue = this.dniControl.value;

      console.log(endpoint + " " + nomValue + " " + cognomValue + " " + telefonValue + " " + emailValue + " " + dniValue);

      const requestBody = {
        nom: nomValue,
        cognoms: cognomValue,
        telefon: telefonValue,
        email: emailValue,
        dni: dniValue
      };

      if (endpoint) {
        this.saveFormData(endpoint, requestBody).subscribe(
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

  saveFormData(endpoint: string, formData: any) {
    return this.http.post(endpoint, formData);
  }
}