import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { RecordsService } from 'src/app/services/records.service';

import { Pregunta } from 'src/app/models/pregunta.model';
import { Respuesta } from 'src/app/models/respuesta.model';
import { Record } from 'src/app/models/record.model';

@Component({
  selector: 'app-form-trivia',
  templateUrl: './form-trivia.component.html',
  styleUrls: ['./form-trivia.component.css'],
})
export class FormTriviaComponent implements OnChanges, OnInit {
  @Input() public preguntas: Pregunta[];
  public record: Record;
  public guardando: boolean;

  private fechaInicio: Date;
  private numeroPreguntaActual: number;
  public preguntaActual: Pregunta;
  public intentoTerminado: boolean;
  public colores: string[] = [
    'warning',
    'primary',
    'secondary',
    'danger',
    'info',
  ];

  constructor(
    private authService: AuthService,
    private recordsService: RecordsService
  ) {
    this.record = new Record();
    this.record.totalAciertos = 0;
    this.numeroPreguntaActual = 0;
    this.intentoTerminado = false;
    this.guardando = false;
  }

  ngOnInit(): void {
    this.fechaInicio = new Date();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.preguntas.isFirstChange()) {
      this.preguntaActual = this.preguntas[this.numeroPreguntaActual];
      this.record.categoria = this.preguntaActual.categoria;
    }
  }

  public seleccionarRespuesta(respuesta: Respuesta) {
    this.record.totalAciertos = respuesta.correcta
      ? this.record.totalAciertos + 1
      : this.record.totalAciertos;

    if (this.numeroPreguntaActual === 19) {
      this.intentoTerminado = true;
      this.guardando = true;
      this.registrarRecord();
    } else {
      this.preguntaActual = this.preguntas[++this.numeroPreguntaActual];
    }
  }

  private registrarRecord() {
    this.construirRecord();
    this.recordsService.save(this.record).subscribe((r) => {
      this.record = r;
      this.guardando = false;
    });
  }

  private construirRecord(): void {
    const fechaFin = new Date();

    this.record.preguntas = this.preguntas;
    this.record.usuario = this.authService.usuario;
    this.record.tiempo = fechaFin.getTime() - this.fechaInicio.getTime();
  }
}
