import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

const rutas: Routes = [
  {
    path: 'catalogos',
    loadChildren: () =>
      import('./catalogos/catalogos.module').then((m) => m.CatalogosModule),
    canActivate: [RoleGuard],
    data: {
      roles: ['ROLE_ADMIN'],
    },
  },
  {
    path: 'trivias',
    loadChildren: () =>
      import('./trivias/trivias.module').then((m) => m.TriviasModule),
    canActivate: [RoleGuard],
    data: {
      roles: ['ROLE_JUGADOR'],
    },
  },
  {
    path: 'reportes',
    loadChildren: () =>
      import('./reportes/reportes.module').then((m) => m.ReportesModule),
  },
  // La ruta por defecto depende del rol, por ello se usa un guard
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
