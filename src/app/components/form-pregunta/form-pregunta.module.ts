import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormPreguntaComponent } from './form-pregunta.component';

@NgModule({
  declarations: [FormPreguntaComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormPreguntaComponent],
})
export class FormPreguntaModule {}
