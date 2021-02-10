import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { CategoriasService } from '../../../services/categorias.service';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';
import { UploadFirebaseService } from '../../../services/upload-firebase.service';

import { Categoria } from '../../../models/categoria.model';
import { FileItem } from '../../../models/file-item.model';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {

  public guardando: boolean;
  public cargando: boolean;

  public categoria: Categoria;
  public form: FormGroup;

  public imagenSeleccionada: FileItem;

  constructor(private categoriasService: CategoriasService,
              private authService: AuthService,
              private validation: ValidationService,
              private uploadFirebaseService: UploadFirebaseService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.configurarForm();

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

  configurarForm(): void {
    this.form = new FormGroup({
      categoria: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(this.validation.alfaNumEspaciosAcentos)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150),
        Validators.pattern(this.validation.alfaNumEspaciosAcentos)
      ])
    });
  }

  obtenerCategoria(id: number): void {
    this.categoriasService.findById(id).subscribe(categoria => {
      this.categoria = categoria;
      this.poblarFormulario();
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

  poblarFormulario(): void {
    this.form.get('categoria').setValue(this.categoria.categoria);
    this.form.get('descripcion').setValue(this.categoria.descripcion);
  }

  async guardarCategoria(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.guardando = true;
      if (this.imagenSeleccionada) {
        const urlImagenCargada = await this.cargarImagen();
        this.categoria.imagen = urlImagenCargada;
      }

      this.construirCategoria();
      if (this.categoria.id === 0) {
        this.crear();
      } else {
        this.actualizar();
      }
    }
  }

  async cargarImagen(): Promise<any> {
    await this.uploadFirebaseService.subirArchivo(this.imagenSeleccionada);

    return this.uploadFirebaseService.referenciaCloudStorage(this.imagenSeleccionada.nombreArchivo)
    .getDownloadURL().toPromise();
  }

  crear(): void {
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
      this.cargando = false;
    });
  }

  actualizar(): void {
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
      this.cargando = false;
    });
  }

  construirCategoria(): void {
    this.categoria.categoria = this.form.get('categoria').value.trim().replace(/\s\s+/g, ' ');
    this.categoria.descripcion = this.form.get('descripcion').value.trim().replace(/\s\s+/g, ' ');
  }

}
