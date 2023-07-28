import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarcadoService {
  private elementosMarcados: any[] = [];

  constructor() {}

  marcarElemento(elemento: any) {
    this.elementosMarcados = [elemento];
  }

  desmarcarElementos() {
    this.elementosMarcados = [];
  }

  obtenerElementosMarcados() {
    return this.elementosMarcados;
  }
}
