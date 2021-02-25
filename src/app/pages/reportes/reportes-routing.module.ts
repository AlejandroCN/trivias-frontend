import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role.guard';

const rutas: Routes = [
  {
    path: 'mis-records',
    loadChildren: () =>
      import('./mis-records/mis-records.module').then(
        (m) => m.MisRecordsModule
      ),
    canActivate: [RoleGuard],
    data: {
      roles: ['ROLE_JUGADOR'],
    },
  },
  {
    path: 'top-ten',
    loadChildren: () =>
      import('./top-ten/top-ten.module').then((m) => m.TopTenModule),
    canActivate: [RoleGuard],
    data: {
      roles: ['ROLE_JUGADOR', 'ROLE_ADMIN'],
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'top-ten',
  },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
