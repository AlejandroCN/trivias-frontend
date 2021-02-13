import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { ValidationService } from 'src/app/services/validation.service';
import { CategoriasService } from 'src/app/services/categorias.service';

import { Categoria } from 'src/app/models/categoria.model';
import { Pregunta } from 'src/app/models/pregunta.model';
import { Respuesta } from 'src/app/models/respuesta.model';

@Component({
  selector: 'app-form-pregunta',
  templateUrl: './form-pregunta.component.html',
  styleUrls: ['./form-pregunta.component.css'],
})
export class FormPreguntaComponent implements OnInit {
  public guardando: boolean;
  public cargando: boolean;

  public pregunta: Pregunta;
  public form: FormGroup;

  public categorias: Categoria[];
  public respuestas: Respuesta[];
  public colores = ['success', 'primary', 'info', 'warning', 'danger'];

  constructor(
    private preguntasService: PreguntasService,
    private authService: AuthService,
    private categoriasService: CategoriasService,
    private validation: ValidationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cargando = true;
    this.configurarForm();
    this.inicializarRespuestas();

    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.cargando = true;
        this.obtenerPregunta(params.id);
      } else {
        this.pregunta = new Pregunta();
        this.pregunta.id = 0;
      }
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias()
      .then((categorias) => {
        this.categorias = categorias;
        this.cargando = false;
        console.log(this.categorias);
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.errorDeAutenticacion();
        } else if (err.status !== 404) {
          Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        }
        this.cargando = false;
      });
  }

  obtenerCategorias(): Promise<Categoria[]> {
    return this.categoriasService.findAll().toPromise();
  }

  configurarForm(): void {
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

  inicializarRespuestas(): void {
    this.respuestas = new Array(5);
    console.log(this.respuestas);
  }

  obtenerPregunta(id: number): void {
    this.preguntasService.findById(id).subscribe(
      (pregunta) => {
        this.pregunta = pregunta;
        this.poblarFormulario();
        this.cargando = false;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.errorDeAutenticacion();
        } else {
          Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        }
        this.cargando = false;
      }
    );
  }

  poblarFormulario(): void {
    this.form.get('categoria').setValue(this.pregunta.categoria.id);
    this.form.get('pregunta').setValue(this.pregunta.pregunta);
  }

  guardarPregunta(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.guardando = true;
      this.construirPregunta();
      if (this.pregunta.id === 0) {
        this.crear();
      } else {
        this.actualizar();
      }
    }
  }

  crear(): void {
    this.preguntasService.save(this.pregunta).subscribe(
      (pregunta) => {
        Swal.fire(
          'Pregunta Registrada',
          `Se ha registrado la pregunta ${pregunta.pregunta}`,
          'success'
        );
        this.guardando = false;
        this.router.navigateByUrl('/catalogos/preguntas');
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.errorDeAutenticacion();
        } else {
          Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
          console.log(err);
          this.router.navigateByUrl('/catalogos/preguntas');
        }
        this.cargando = false;
      }
    );
  }

  actualizar(): void {
    this.preguntasService.update(this.pregunta).subscribe(
      (pregunta) => {
        Swal.fire(
          'Pregunta Actualizada',
          `Se ha actualizado la pregunta ${pregunta.categoria}`,
          'success'
        );
        this.guardando = false;
        this.router.navigateByUrl('/catalogos/preguntas');
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.errorDeAutenticacion();
        } else {
          Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
          console.log(err);
          this.router.navigateByUrl('/catalogos/preguntas');
        }
        this.cargando = false;
      }
    );
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
