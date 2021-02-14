import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { PreguntasService } from 'src/app/services/preguntas.service';

import { Pregunta } from 'src/app/models/pregunta.model';
import { Respuesta } from 'src/app/models/respuesta.model';

import { FormPreguntaComponent } from '../../../../components/form-pregunta/form-pregunta.component';
import { FormRespuestasComponent } from '../../../../components/form-respuestas/form-respuestas.component';

@Component({
  selector: 'app-registrar-pregunta',
  templateUrl: './registrar-pregunta.component.html',
  styleUrls: [],
})
export class RegistrarPreguntaComponent implements OnInit {
  public guardando: boolean;
  public cargando: boolean;

  public pregunta: Pregunta;
  public respuestas: Respuesta[] = [];

  @ViewChild(FormPreguntaComponent, { static: true })
  public form: FormPreguntaComponent;
  @ViewChild(FormRespuestasComponent, { static: true })
  public formRespuestas: FormRespuestasComponent;

  constructor(
    private preguntasService: PreguntasService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.cargando = true;
        this.obtenerPregunta(params.id);
      } else {
        this.inicializarRespuestas();
        this.pregunta = new Pregunta();
        this.pregunta.id = 0;
      }
    });
  }

  ngOnInit(): void {}

  inicializarRespuestas(): void {
    for (let i=0; i<5; i++) {
      const respuesta = new Respuesta();
      this.respuestas.push(respuesta);
    }
  }

  obtenerPregunta(id: number): void {
    this.preguntasService.findById(id).subscribe(
      (pregunta) => {
        this.pregunta = pregunta;
        this.respuestas = pregunta.respuestas;
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

  guardarPregunta(): void {
    if (this.form.poblarPregunta() && this.formRespuestas.isValid()) {
      this.guardando = true;
      this.pregunta.respuestas = this.respuestas;
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
