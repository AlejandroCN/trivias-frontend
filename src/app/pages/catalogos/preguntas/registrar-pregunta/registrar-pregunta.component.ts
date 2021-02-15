import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { PreguntasService } from 'src/app/services/preguntas.service';

import { Pregunta } from 'src/app/models/pregunta.model';
import { Respuesta } from 'src/app/models/respuesta.model';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-registrar-pregunta',
  templateUrl: './registrar-pregunta.component.html',
  styleUrls: [],
})
export class RegistrarPreguntaComponent implements OnInit {
  public guardando: boolean;
  public cargando: boolean;

  public pregunta: Pregunta;
  public formulario: FormGroup;

  constructor(
    private preguntasService: PreguntasService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.inicializarFormulario();
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.cargando = true;
        this.obtenerPregunta(params.id);
      } else {
        this.pregunta = new Pregunta();
        this.pregunta.id = 0;
        this.inicializarRespuestas();
      }
    });
  }

  ngOnInit(): void {}

  private inicializarFormulario(): void {
    this.formulario = new FormGroup({});
  }

  private inicializarRespuestas(): void {
    this.pregunta.respuestas = [];
    for (let i = 0; i < 5; i++) {
      const respuesta = new Respuesta();
      this.pregunta.respuestas.push(respuesta);
    }
  }

  private obtenerPregunta(id: number): void {
    this.preguntasService.findById(id).subscribe(
      (pregunta) => {
        this.pregunta = pregunta;
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

  public guardarPregunta(): void {
    this.formulario.markAllAsTouched();
    if (this.formulario.valid) {
      this.guardando = true;
      this.construirPregunta();
      if (this.pregunta.id === 0) {
        this.crear();
      } else {
        this.actualizar();
      }
    }
  }

  private construirPregunta(): void {
    this.pregunta.categoria = new Categoria();
    this.pregunta.categoria.id = Number(this.formulario.get('categoria').value);
    this.pregunta.pregunta = this.formulario
      .get('pregunta')
      .value.trim()
      .replace(/\s\s+/g, ' ');

    const arrayInputs = this.formulario.get('inputs') as FormArray;
    const arrayChecks = this.formulario.get('checks') as FormArray;
    this.pregunta.respuestas.forEach((resp, index) => {
      resp.correcta = arrayChecks.controls[index].value;
      resp.respuesta = arrayInputs.controls[index].value
        .trim()
        .replace(/\s\s+/g, ' ');
    });
  }

  private crear(): void {
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

  private actualizar(): void {
    this.preguntasService.update(this.pregunta).subscribe(
      (pregunta) => {
        Swal.fire(
          'Pregunta Actualizada',
          `Se ha actualizado la pregunta ${pregunta.pregunta}`,
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
}
