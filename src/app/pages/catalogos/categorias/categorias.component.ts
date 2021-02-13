import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../services/auth.service';
import { CategoriasService } from '../../../services/categorias.service';
import { UploadFirebaseService } from '../../../services/upload-firebase.service';

import { Categoria } from '../../../models/categoria.model';
import { Pagina } from 'src/app/models/pagina.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  // controla la animacion del spinner de carga de la pagina
  public cargando: boolean;
  // mensaje de error proveniente de las peticiones http
  public mensajeErrorHttp: string;

  // lista de categorias obtenidas del backend
  public categorias: Categoria[];
  // parametros de la paginacion de la tabla
  public pagina: Pagina;

  // opciones posibles para seleccionar el tamaño de la página que se visualiza
  public itemsPorPagina = [5, 10, 15];

  constructor(private authService: AuthService,
              private categoriasService: CategoriasService,
              private uploadFirebaseService: UploadFirebaseService,
              private router: Router) {

    this.cargando = true;
    this.mensajeErrorHttp = '';
    this.pagina = new Pagina();
    this.pagina.atributo = 'categoria';
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
    this.router.navigate(['/catalogos/categorias/form-categoria']);
  }

  obtenerPagina(): void {
    this.categoriasService.findAllPages(this.pagina)
    .subscribe((resp: any) => {
      this.mensajeErrorHttp = '';
      this.categorias = resp.content;
      this.pagina.totalElementos = resp.totalElements;

      this.cargando = false;
    }, err => {
      if (err.status === 401 || err.status === 403) {
        this.authService.errorDeAutenticacion();
      } else if (err.status === 404) {
        this.mensajeErrorHttp = err.error.mensaje;
        this.categorias = [];
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

  async eliminar(categoria: Categoria): Promise<void> {
    Swal.fire({
      title: 'Está Seguro?',
      text: `La categoría : ${categoria.categoria} será eliminada`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.categoriasService.delete(categoria.id).subscribe(async (resp) => {
          if (categoria.imagen) {
            await this.uploadFirebaseService.eliminarArchivo(categoria.imagen.nombre);
          }

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
        Swal.fire('Cancelado', 'No se ha eliminado ninguna categoría', 'error');
      }
    });
  }

}
