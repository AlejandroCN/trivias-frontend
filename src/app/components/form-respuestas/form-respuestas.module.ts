import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormRespuestasComponent } from './form-respuestas.component';

@NgModule({
  declarations: [FormRespuestasComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormRespuestasComponent],
})
export class FormRespuestasModule {}
