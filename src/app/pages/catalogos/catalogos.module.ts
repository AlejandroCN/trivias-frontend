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
import { RegistrarCategoriaComponent } from './registrar-categoria/registrar-categoria.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { FormPreguntaComponent } from './form-pregunta/form-pregunta.component';
import { FormCategoriaModule } from '../../components/form-categoria/form-categoria.module';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { FormActionsModule } from '../../components/form-actions/form-actions.module';

@NgModule({
  declarations: [
    CategoriasComponent,
    RegistrarCategoriaComponent,
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
    PipesModule,
    FormCategoriaModule,
    SpinnerModule,
    FormActionsModule
  ]
})
export class CatalogosModule { }
