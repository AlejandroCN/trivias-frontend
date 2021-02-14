import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PreguntasComponent } from './preguntas.component';
import { RegistrarPreguntaComponent } from './registrar-pregunta/registrar-pregunta.component';

import { PreguntasRoutingModule } from './preguntas-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { HeaderTableModule } from 'src/app/components/header-table/header-table.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { FormPreguntaModule } from 'src/app/components/form-pregunta/form-pregunta.module';
import { FormRespuestasModule } from 'src/app/components/form-respuestas/form-respuestas.module';
import { FormActionsModule } from '../../../components/form-actions/form-actions.module';

@NgModule({
  declarations: [PreguntasComponent, RegistrarPreguntaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    FontAwesomeModule,
    PreguntasRoutingModule,
    PipesModule,
    HeaderTableModule,
    SpinnerModule,
    FormActionsModule,
    FormPreguntaModule,
    FormRespuestasModule,
  ],
})
export class PreguntasModule {}
