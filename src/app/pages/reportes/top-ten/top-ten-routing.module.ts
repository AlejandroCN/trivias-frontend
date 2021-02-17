import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from 'src/app/guards/role.guard';
import { TopTenComponent } from './top-ten.component';

const rutas: Routes = [
  {
    path: '',
    component: TopTenComponent,
    canActivate: [RoleGuard],
    data: {
      titulo: 'Top Ten',
      icono: 'chart-bar',
      descripcion:
        'Los diez mejores puntajes obtenidos en las trivias de todas las categorías',
      roles: ['ROLE_ADMIN', 'ROLE_JUGADOR'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class TopTenRoutingModule {}
