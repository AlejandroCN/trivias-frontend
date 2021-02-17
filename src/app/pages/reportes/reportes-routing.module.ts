import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const rutas: Routes = [
  {
    path: 'mis-records',
    loadChildren: () =>
      import('./mis-records/mis-records.module').then(
        (m) => m.MisRecordsModule
      ),
  },
  {
    path: 'top-ten',
    loadChildren: () =>
      import('./top-ten/top-ten.module').then((m) => m.TopTenModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'top-ten'
  }
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
