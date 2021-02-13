import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { HeaderTableModule } from '../../components/header-table/header-table.module';
import { SubirImagenModule } from '../../components/subir-imagen/subir-imagen.module';
import { PipesModule } from '../../pipes/pipes.module';

import { CategoriasComponent } from './categorias/categorias.component';
import { FormCategoriaComponent } from './form-categoria/form-categoria.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { FormPreguntaComponent } from './form-pregunta/form-pregunta.component';

@NgModule({
  declarations: [
    CategoriasComponent,
    FormCategoriaComponent,
    PreguntasComponent,
    FormPreguntaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbPaginationModule,
    CatalogosRoutingModule,
    HeaderTableModule,
    SubirImagenModule,
    PipesModule
  ]
})
export class CatalogosModule { }
