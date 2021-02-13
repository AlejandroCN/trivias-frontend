import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rutas: Routes = [
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule)
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./preguntas/preguntas.module').then(m => m.PreguntasModule)
  }
];

@NgModule({
  imports: [ RouterModule.forChild(rutas) ],
  exports: [ RouterModule ]
})
export class CatalogosRoutingModule { }
