import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopTenComponent } from './top-ten.component';

const rutas: Routes = [
  {
    path: '',
    component: TopTenComponent,
    data: {
      titulo: 'Top Ten',
      icono: 'chart-bar',
      descripcion:
        'Los diez mejores puntajes obtenidos en las trivias de todas las categorías',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class TopTenRoutingModule {}
