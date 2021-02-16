import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const rutas: Routes = [
  {
    path: 'listar-categorias',
    loadChildren: () =>
      import('./listar-categorias/listar-categorias.module').then(
        (m) => m.ListarCategoriasModule
      ),
  },
  {
    path: 'jugar-trivia',
    loadChildren: () =>
      import('./jugar-trivia/jugar-trivia.module').then(
        (m) => m.JugarTriviaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class TriviasRoutingModule {}
