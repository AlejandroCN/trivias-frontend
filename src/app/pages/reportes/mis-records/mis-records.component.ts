import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { RecordsService } from 'src/app/services/records.service';

import { Record } from 'src/app/models/record.model';

@Component({
  selector: 'app-mis-records',
  templateUrl: './mis-records.component.html',
  styles: [],
})
export class MisRecordsComponent implements OnInit {
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
    this.obtenerMisRecords();
  }

  private obtenerMisRecords(): void {
    this.recordsService.findAllByUsuario(this.authService.usuario.id).subscribe(
      (records) => {
        this.mensajeErrorHttp = '';
        this.records = records;
        this.cargando = false;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.errorDeAutenticacion();
        } else if (err.status === 404) {
          this.mensajeErrorHttp = '';
        } else {
          Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        }
        this.records = [];
        this.cargando = false;
      }
    );
  }
}
