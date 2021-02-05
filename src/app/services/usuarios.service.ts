import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private endPoint = `${environment.apiUrl}/api/usuarios`;

  constructor(private http: HttpClient) { }

  save(usuario: Usuario): Observable<Usuario> {
    return this.http.post(`${this.endPoint}`, usuario).pipe(
      map(response => response as Usuario)
    );
  }

}
