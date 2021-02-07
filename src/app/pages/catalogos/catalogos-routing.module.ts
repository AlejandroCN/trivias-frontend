import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias/categorias.component';

const rutas: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent,
    data: {
      titulo: 'Categorías',
      descripcion: 'Clasificadores para las preguntas de la aplicación',
      icono: 'object-group'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(rutas) ],
  exports: [ RouterModule ]
})
export class CatalogosRoutingModule { }
