import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


const baseUrl = 'https://app-titu.herokuapp.com';

export interface User {
  username: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user: any; // Variable para almacenar la información del usuario actual
  private user$: Subject<any>; // Subject que emite información a componentes
  private isAuthenticated = false;

  constructor(private http: HttpClient) {
    this.user$ = new Subject(); // Inicializar el Subject user$
  }

  signup(data: any) {
    // Método para realizar la autenticación del usuario

    this.user = data; // Actualizar la información del usuario
    this.user$.next(this.user); // Emitir la información del usuario a través del Subject user$
    this.isAuthenticated = true;

    return this.http.post(`${baseUrl}/login`, data); // Realizar una solicitud HTTP POST para autenticar al usuario
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null; // Restablecer la información del usuario
    this.user$.next(this.user); // Notificar a los componentes suscritos sobre el cambio de estado de autenticación

    // Puedes realizar cualquier otra acción necesaria para cerrar la sesión del usuario, como eliminar tokens o limpiar el almacenamiento local.
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('auth-username');
  }

  login(){
    this.isAuthenticated = true;
  }

  getByName(name: string): Observable<any> {
    // Método para obtener información del usuario por nombre

    return this.http.get(`${baseUrl}/users/${name}`); // Realizar una solicitud HTTP GET para obtener información del usuario
  }

  add(data: any) {
    // Método para agregar un nuevo usuario

    return this.http.post(`${baseUrl}/users/`, data); // Realizar una solicitud HTTP POST para agregar un nuevo usuario
  }

  getUser$(): Observable<any>{
    // Método para obtener el Subject user$

    return this.user$.asObservable(); // Devolver el Subject user$
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
