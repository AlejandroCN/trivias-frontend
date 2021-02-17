import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Record } from 'src/app/models/record.model';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private apiUrl = `${environment.apiUrl}/api/records`;

  constructor(private http: HttpClient) {}

  save(record: Record): Observable<Record> {
    return this.http
      .post(this.apiUrl, record)
      .pipe(map((response) => response as Record));
  }

  findAllByUsuario(usuarioId: number) {
    return this.http
      .get(`${this.apiUrl}/findAllByUsuario/${usuarioId}`)
      .pipe(map((response) => response as Record[]));
  }

  getTopTen() {
    return this.http
      .get(`${this.apiUrl}/getTopTen`)
      .pipe(map((response) => response as any));
  }
}
