import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CategoriasService } from '../../../services/categorias.service';
import { AuthService } from '../../../services/auth.service';

import { Categoria } from '../../../models/categoria.model';
import { Imagen } from '../../../models/imagen.model';

import { SubirImagenComponent } from '../../../components/subir-imagen/subir-imagen.component';
import { FormCategoriaComponent } from '../../../components/form-categoria/form-categoria.component';

@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: []
})
export class RegistrarCategoriaComponent implements OnInit {

  public guardando: boolean;
  public cargando: boolean;

  public categoria: Categoria;

  @ViewChild(SubirImagenComponent, {static: true}) public cargadorImagen: SubirImagenComponent;
  @ViewChild(FormCategoriaComponent, {static: true}) public form: FormCategoriaComponent;

  constructor(private categoriasService: CategoriasService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.cargando = true;
        this.obtenerCategoria(params.id);
      } else {
        this.categoria = new Categoria();
        this.categoria.id = 0;
      }
    });
  }

  ngOnInit(): void {
  }

  private obtenerCategoria(id: number): void {
    this.categoriasService.findById(id).subscribe(categoria => {
      this.categoria = categoria;
      this.cargando = false;
    }, err => {
      if (err.status === 401 || err.status === 403) {
        this.authService.errorDeAutenticacion();
      } else {
        Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
      }
      this.cargando = false;
    });
  }

  public async guardarCategoria(): Promise<void> {
    if (this.form.poblarCategoria()) {
      this.guardando = true;
      this.form.desactivarInputs();
      
      await this.cargarImagen();
      if (this.categoria.id === 0) {
        this.crear();
      } else {
        this.actualizar();
      }
    }
  }
  
  private async cargarImagen(): Promise<void> {
    try {
      const imagenCargada = await this.cargadorImagen.cargarImagen();
      this.categoria.imagen = !this.categoria.imagen ? new Imagen() : this.categoria.imagen;
      this.categoria.imagen.nombre = imagenCargada.nombre;
      this.categoria.imagen.url = await imagenCargada.url;
    } catch (err) {
      console.log(err);
    }
  }

  private crear(): void {
    this.categoriasService.save(this.categoria).subscribe(categoria => {
      Swal.fire('Categoría Registrada', `Se ha registrado la categoría ${categoria.categoria}`, 'success');
      this.guardando = false;
      this.router.navigateByUrl('/catalogos/categorias');
    }, err => {
      if (err.status === 401 || err.status === 403) {
        this.authService.errorDeAutenticacion();
      } else {
        Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        console.log(err);
        this.router.navigateByUrl('/catalogos/categorias');
      }
      this.guardando = false;
    });
  }

  private actualizar(): void {
    this.categoriasService.update(this.categoria).subscribe(categoria => {
      Swal.fire('Categoría Actualizada', `Se ha actualizado la categoría ${categoria.categoria}`, 'success');
      this.guardando = false;
      this.router.navigateByUrl('/catalogos/categorias');
    }, err => {
      if (err.status === 401 || err.status === 403) {
        this.authService.errorDeAutenticacion();
      } else {
        Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        console.log(err);
        this.router.navigateByUrl('/catalogos/categorias');
      }
      this.guardando = false;
    });
  }

}
