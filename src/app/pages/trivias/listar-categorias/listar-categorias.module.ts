import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarCategoriasComponent } from './listar-categorias.component';

import { ListarCategoriasRoutingModule } from './listar-categorias-routing.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IconAlertModule } from 'src/app/components/icon-alert/icon-alert.module';

@NgModule({
  declarations: [ListarCategoriasComponent],
  imports: [
    CommonModule,
    ListarCategoriasRoutingModule,
    SpinnerModule,
    PipesModule,
    IconAlertModule,
  ],
})
export class ListarCategoriasModule {}
