import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarcadoService {
  private elementosInferioresMarcados: any[] = [];
  private elementosSuperioresMarcados: any[] = [];
  private rutasMarcadas: any[] = [];

  constructor() {}

  marcarElementoInferior(elemento: any) {
    this.elementosInferioresMarcados = [elemento];
    this.desmarcarRuta();
    this.desmarcarElementosSuperior();
  }

  desmarcarElementosInferior() {
    this.elementosInferioresMarcados = [];
  }

  obtenerElementosInferioresMarcados() {
    return this.elementosInferioresMarcados;
  }

  marcarElementoSuperior(elemento: any) {
    this.elementosSuperioresMarcados = [elemento];
    this.desmarcarRuta();
    this.desmarcarElementosInferior();
  }

  desmarcarElementosSuperior() {
    this.elementosSuperioresMarcados = [];
  }

  obtenerElementosSuperioresMarcados() {
    return this.elementosSuperioresMarcados;
  }

  marcarRuta(elemento: any) {
    this.rutasMarcadas = [elemento];
    this.desmarcarElementosSuperior();
    this.desmarcarElementosInferior()
  }

  desmarcarRuta() {
    this.rutasMarcadas = [];
  }

  obtenerRutasMarcadas() {
    return this.rutasMarcadas;
  }
}
