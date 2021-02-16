import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { CategoriasService } from 'src/app/services/categorias.service';

import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css'],
})
export class ListarCategoriasComponent implements OnInit {
  public categorias: Categoria[];
  public cargando: boolean;

  constructor(
    private categoriasService: CategoriasService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cargando = true;
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  private obtenerCategorias() {
    this.categoriasService.findAll().subscribe(
      (categorias) => {
        this.categorias = categorias;
        this.cargando = false;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.errorDeAutenticacion();
        } else if (err.status !== 404) {
          Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        }
        this.cargando = false;
      }
    );
  }

  public seleccionarCategoria(categoria: Categoria) {
    this.router.navigate(['/trivias/jugar-trivia', categoria.id]);
  }
}
