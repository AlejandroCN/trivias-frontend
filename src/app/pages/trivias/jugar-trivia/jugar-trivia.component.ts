import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { PreguntasService } from 'src/app/services/preguntas.service';

import { Pregunta } from 'src/app/models/pregunta.model';

@Component({
  selector: 'app-jugar-trivia',
  templateUrl: './jugar-trivia.component.html',
  styleUrls: ['./jugar-trivia.component.css'],
})
export class JugarTriviaComponent implements OnInit {
  public cargando: boolean;
  public preguntas: Pregunta[];
  public mensajeErrorHttp: string;

  constructor(
    private preguntasService: PreguntasService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.mensajeErrorHttp = '';
    this.cargando = true;
    this.activatedRoute.params.subscribe((params) => {
      this.obtenerPreguntasRandom(params.id);
    });
  }

  ngOnInit(): void {}

  private obtenerPreguntasRandom(categoriaId: number): void {
    this.preguntasService.find20RandomByCategoria(categoriaId).subscribe(
      (preguntas) => {
        this.mensajeErrorHttp = '';
        this.preguntas = preguntas;
        this.cargando = false;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.errorDeAutenticacion();
        } else if (err.status === 404 || err.status === 400) {
          this.mensajeErrorHttp = err.error.mensaje;
          this.preguntas = [];
        } else {
          Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        }
        this.cargando = false;
      }
    );
  }
}
