import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol.model';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint = `${environment.apiUrl}/api`;

  // tslint:disable-next-line: variable-name
  private _usuario: Usuario;
  // tslint:disable-next-line: variable-name
  private _token: string;
  // tslint:disable-next-line: variable-name
  private _rol: Rol;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public get usuario(): Usuario {
    if (this._usuario !== null && this._usuario !== undefined) {
      return this._usuario;
    } else if (localStorage.getItem('usuario') !== null && localStorage.getItem('usuario') !== undefined) {
      this._usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    } else {
      return new Usuario();
    }
  }

  public set usuario(usuario: Usuario) {
    this._usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  public get token(): string {
    if (this._token !== null && this._token !== undefined) {
      return this._token;
    } else if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
      this._token = localStorage.getItem('token');
      return this._token;
    } else {
      return null;
    }
  }

  public get rol(): Rol {
    if (this._rol !== null && this._rol !== undefined) {
      return this._rol;
    } else if (localStorage.getItem('rol') !== null && localStorage.getItem('rol') !== undefined) {
      this._rol = JSON.parse(localStorage.getItem('rol')) as Rol;
      return this._rol;
    } else {
      return new Rol();
    }
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.endPoint}/login`, usuario).pipe(
      map(response => response as any)
    );
  }

  logout(): void {
    this._rol = null;
    this._token = null;
    this._usuario = null;
    localStorage.clear();
  }

  guardarDatosSesion(accessToken: string): void {
    const payload = this.decodificarToken(accessToken);

    this._usuario = JSON.parse(payload.usuario) as Usuario;
    this._rol = this.usuario.rol;
    this._token = accessToken;

    localStorage.setItem('usuario', JSON.stringify(this._usuario));
    localStorage.setItem('token', this._token);
    localStorage.setItem('rol', JSON.stringify(this._rol));
  }

  decodificarToken(accessToken: string): any {
    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  estaAutenticado(): boolean {
    const token = this.token;
    if (token !== null && token !== undefined) {
      return true;
    }
    return false;
  }

  tokenExpirado(): boolean {
    const payload = this.decodificarToken(this.token);
    const fechaActual = new Date().getTime() / 1000;

    if (payload.exp < fechaActual) {
      return true;
    }
    return false;
  }

  /**
   * Valida que el nombre del rol guardado en la sesion exista en una lista de roles
   * @param roles es la lista de roles donde se buscara el rol del usuario autenticado
   */
  tieneRol(roles: string[]): boolean {
    if (roles) {
      const rolAutenticado = this.rol;
      if (rolAutenticado) {
        let rol = '';
        rol = (roles.filter((r) => r === this.rol.nombre))[0];

        if (rol) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  errorDeAutenticacion(): void {
    this.logout();
    this.router.navigate(['/auth/login']);
    Swal.fire({
      icon: 'error',
      title: 'La sesión ha expirado!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  accesoDenegado(): void {
    this.paginaInicio();
    Swal.fire({
      icon: 'warning',
      title: 'Acceso Denegado: 403',
      text: 'No tiene permiso de acceder a este recurso'
    });
  }

  paginaInicio(): void {
    // Puede que dependa del rol, mas adelante se debe tomar en cuenta
    this.router.navigate(['/']);
  }

}
