import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarCategoriasComponent } from './listar-categorias.component';

const rutas: Routes = [
  {
    path: '',
    component: ListarCategoriasComponent,
    data: {
      titulo: 'Seleccionar Categoría',
      icono: 'play-circle',
      descripcion: 'Seleccionar una categoría para contestar una trivia relacionada'
    }
  },
];

@NgModule({
  imports: [ RouterModule.forChild(rutas) ],
  exports: [ RouterModule ]
})
export class ListarCategoriasRoutingModule {}
