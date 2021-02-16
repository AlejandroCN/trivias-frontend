import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugarTriviaComponent } from './jugar-trivia.component';

const rutas: Routes = [
  {
    path: ':id',
    component: JugarTriviaComponent,
    data: {
      titulo: 'Jugar Trivia',
      icono: 'puzzle-piece',
      descripcion:
        'Responde 20 preguntas aleatorias en base a la categoría seleccionada',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class JugarTriviaRoutingModule {}
