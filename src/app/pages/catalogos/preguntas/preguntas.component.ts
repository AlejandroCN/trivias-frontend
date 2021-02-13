import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PreguntasService } from 'src/app/services/preguntas.service';
import { AuthService} from 'src/app/services/auth.service';

import { Pregunta } from '../../../models/pregunta.model';
import { Pagina } from 'src/app/models/pagina.model';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: []
})
export class PreguntasComponent implements OnInit {

  // controla la animacion del spinner de carga de la pagina
  public cargando: boolean;
  // mensaje de error proveniente de las peticiones http
  public mensajeErrorHttp: string;

  // lista de preguntas obtenidas del backend
  public preguntas: Pregunta[];
  // parametros de la paginacion de la tabla
  public pagina: Pagina;

  // opciones posibles para seleccionar el tamaño de la página que se visualiza
  public itemsPorPagina = [5, 10, 15];

  constructor(private authService: AuthService,
              private preguntasService: PreguntasService,
              private router: Router) {

    this.cargando = true;
    this.mensajeErrorHttp = '';
    this.pagina = new Pagina();
    this.pagina.atributo = 'pregunta';
  }

  ngOnInit(): void {
    this.obtenerPagina();
  }

  cambioPagina(tam: number): void {
    this.pagina.reset();
    this.pagina.tamPagina = tam;
    this.obtenerPagina();
  }

  cambioTermino(term: string): void {
    this.pagina.termino = term;
    this.obtenerPagina();
  }

  clickBotonAgregar(): void {
    this.router.navigate(['/catalogos/form-pregunta']);
  }

  obtenerPagina(): void {
    this.preguntasService.findAllPages(this.pagina)
    .subscribe((resp: any) => {
      this.mensajeErrorHttp = '';
      this.preguntas = resp.content;
      this.pagina.totalElementos = resp.totalElements;

      this.cargando = false;
    }, err => {
      if (err.status === 401 || err.status === 403) {
        this.authService.errorDeAutenticacion();
      } else if (err.status === 404) {
        this.mensajeErrorHttp = err.error.mensaje;
        this.preguntas = [];
        this.pagina.totalElementos = 0;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Algo salió muy mal!',
          text: err.error.mensaje
        });
      }
      this.cargando = false;
    });
  }

  ordenar(attr: string): void {
    this.pagina.direccion = !this.pagina.direccion;
    this.pagina.atributo = attr;
    this.obtenerPagina();
  }

  eliminar(pregunta: Pregunta): void {
    Swal.fire({
      title: 'Está Seguro?',
      text: `La pregunta : ${ pregunta.pregunta } será eliminada`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.preguntasService.delete(pregunta.id).subscribe((resp) => {
          this.cargando = true;
          this.pagina.reset();
          this.obtenerPagina();
          Swal.fire('Eliminada!', resp.mensaje, 'success');
        }, err => {
          if (err.status === 403 || err.status === 401) {
            this.authService.errorDeAutenticacion();
          } else if (err.status === 400) {
            Swal.fire('Atención!', err.error.mensaje, 'warning');
          } else {
            Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
          }
          this.cargando = false;
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se ha eliminado ninguna pregunta', 'error');
      }
    });
  }
  
}

