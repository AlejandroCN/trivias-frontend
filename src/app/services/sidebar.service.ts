import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Menu } from '../models/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http: HttpClient) {}

  obtenerMenus(): Observable<Menu[]> {
    return this.http.get('assets/data/menu.json').pipe(
      map(response => response as Menu[])
    );
  }

}
