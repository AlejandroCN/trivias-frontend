import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '../../../components/spinner/spinner.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CategoriasComponent } from './categorias.component';
import { RegistrarCategoriaComponent } from './registrar-categoria/registrar-categoria.component';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { HeaderTableModule } from '../../../components/header-table/header-table.module';
import { SubirImagenModule } from '../../../components/subir-imagen/subir-imagen.module';
import { FormCategoriaModule } from '../../../components/form-categoria/form-categoria.module';
import { FormActionsModule } from '../../../components/form-actions/form-actions.module';

@NgModule({
  declarations: [
    CategoriasComponent,
    RegistrarCategoriaComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FontAwesomeModule,
    CategoriasRoutingModule,
    PipesModule,
    SpinnerModule,
    HeaderTableModule,
    SubirImagenModule,
    FormCategoriaModule,
    FormActionsModule
  ]
})
export class CategoriasModule { }
