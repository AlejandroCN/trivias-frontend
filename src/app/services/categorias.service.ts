import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Categoria } from '../models/categoria.model';
import { environment } from 'src/environments/environment';
import { Pagina } from '../models/pagina.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private endPoint = `${environment.apiUrl}/api/categorias`;

  constructor(private http: HttpClient) { }

  save(categoria: Categoria): Observable<Categoria> {
    return this.http.post(this.endPoint, categoria).pipe(
      map(response => response as Categoria)
    );
  }

  findAll(): Observable<Categoria[]> {
    return this.http.get(this.endPoint).pipe(
      map(response => response as Categoria[])
    );
  }

  findAllPages(p: Pagina): Observable<any> {
    const pagina = Object.assign({} , p);
    pagina.numPagina -= 1;

    return this.http.post(`${this.endPoint}/findAllPages`, pagina).pipe(
      map(response => response as any)
    );
  }

  findById(id: number): Observable<Categoria> {
    return this.http.get(`${this.endPoint}/findById/${id}`).pipe(
      map(response => response as Categoria)
    );
  }

  update(categoria: Categoria): Observable<Categoria> {
    return this.http.put(this.endPoint, categoria).pipe(
      map(response => response as Categoria)
    );
  }

  delete(categoriaId: number): Observable<Categoria> {
    return this.http.delete(`${this.endPoint}/${categoriaId}`).pipe(
      map(response => response as Categoria)
    );
  }

}
