import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Record } from 'src/app/models/record.model';
import { AuthService } from 'src/app/services/auth.service';
import { RecordsService } from 'src/app/services/records.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styles: [],
})
export class TopTenComponent implements OnInit {
  public records: Record[];
  public cargando: boolean;
  public mensajeErrorHttp: string;

  constructor(
    private recordsService: RecordsService,
    private authService: AuthService
  ) {
    this.cargando = true;
    this.mensajeErrorHttp = '';
  }

  ngOnInit(): void {
    this.getTopTen();
  }

  private getTopTen(): void {
    this.recordsService.getTopTen().subscribe(
      (resp) => {
        this.mensajeErrorHttp = '';
        this.records = resp.content;
        this.cargando = false;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.errorDeAutenticacion();
        } else if (err.status === 404) {
          this.mensajeErrorHttp = err.error.mensaje;
        } else {
          Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        }
        this.records = [];
        this.cargando = false;
      }
    );
  }
}
