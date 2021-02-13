import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {Pagina} from '../models/pagina.model';
import {Pregunta} from '../models/pregunta.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private apiUrl = `${environment.apiUrl}/api/preguntas`;

  constructor(private http: HttpClient) {
  }

  save(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.post(this.apiUrl, pregunta).pipe(
      map(response => response as Pregunta)
    );
  }

  findById(id: number): Observable<Pregunta>  {
    return this.http.get(`${this.apiUrl}/findById/${id}`).pipe(
      map(response => response as Pregunta)
    );
  }

  findAllPages(pagina: Pagina): Observable<any>  {
    const pag: Pagina = Object.assign({}, pagina);
    pag.numPagina -= 1;

    return this.http.post(`${this.apiUrl}/findAllPages`, pag).pipe(
      map(response => response as any)
    );
  }

  update(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.put(this.apiUrl, pregunta).pipe(
      map(response => response as Pregunta)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(response => response as any)
    );
  }

}
