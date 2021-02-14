import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ValidationService } from 'src/app/services/validation.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { AuthService } from 'src/app/services/auth.service';

import { Categoria } from 'src/app/models/categoria.model';
import { Pregunta } from 'src/app/models/pregunta.model';

@Component({
  selector: 'app-form-pregunta',
  templateUrl: './form-pregunta.component.html',
  styles: [],
})
export class FormPreguntaComponent implements OnChanges {
  // Pregunta no nula para identificar si se está editando o creando
  @Input() public pregunta: Pregunta;

  public form: FormGroup;
  public categorias: Categoria[];

  constructor(
    private validation: ValidationService,
    private categoriasService: CategoriasService,
    private authService: AuthService
  ) {
    this.configurarForm();
    this.obtenerCategorias();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.pregunta.isFirstChange()) {
      if (this.pregunta.id > 0) {
        this.poblarFormulario();
      }
    }
  }

  private configurarForm(): void {
    this.form = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      pregunta: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
        Validators.pattern(this.validation.pregunta),
      ]),
    });
  }

  private obtenerCategorias() {
    this.categoriasService.findAll().subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.errorDeAutenticacion();
        } else if (err.status !== 404) {
          Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        }
      }
    );
  }

  private poblarFormulario(): void {
    this.form.get('categoria').setValue(this.pregunta.categoria.id);
    this.form.get('pregunta').setValue(this.pregunta.pregunta);
  }

  public poblarPregunta(): boolean {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.construirPregunta();
      return true;
    }
    return false;
  }

  construirPregunta(): void {
    this.pregunta.categoria = new Categoria();
    this.pregunta.categoria.id = Number(this.form.get('categoria').value);
    this.pregunta.pregunta = this.form
      .get('pregunta')
      .value.trim()
      .replace(/\s\s+/g, ' ');
  }
}
