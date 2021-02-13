import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormCategoriaComponent } from './form-categoria.component';

@NgModule({
  declarations: [FormCategoriaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [FormCategoriaComponent],
})
export class FormCategoriaModule {}
