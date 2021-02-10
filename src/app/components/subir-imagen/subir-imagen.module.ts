import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SubirImagenComponent } from './subir-imagen.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SubirImagenComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipesModule
  ],
  exports: [
    SubirImagenComponent
  ]
})
export class SubirImagenModule { }
